from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="English Grammar Books API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Utility function to convert ObjectId to string
def serialize_doc(doc):
    if doc is None:
        return None
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


# Plan Models
class Plan(BaseModel):
    id: Optional[str] = None
    name: str
    price: float
    currency: str = "$"
    originalPrice: Optional[float] = None
    description: str
    features: List[str]
    isPopular: bool = False
    isBestValue: bool = False
    downloadFiles: List[str] = []
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


# Order Models
class OrderCreate(BaseModel):
    customerEmail: EmailStr
    customerName: str
    planId: str
    paymentProof: Optional[str] = None
    upiTransactionId: Optional[str] = None
    notes: Optional[str] = None


class Order(BaseModel):
    id: Optional[str] = None
    orderId: str
    customerEmail: str
    customerName: str
    planId: str
    planName: str
    amount: float
    currency: str
    paymentStatus: str = "pending"  # pending, confirmed, failed
    paymentProof: Optional[str] = None
    upiTransactionId: Optional[str] = None
    downloadLinks: List[str] = []
    downloadCount: int = 0
    maxDownloads: int = 5
    expiresAt: datetime
    isActive: bool = True
    notes: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


# Testimonial Models
class TestimonialCreate(BaseModel):
    name: str
    location: str
    rating: int = Field(ge=1, le=5)
    text: str
    planName: str
    email: Optional[EmailStr] = None


class Testimonial(BaseModel):
    id: Optional[str] = None
    name: str
    location: str
    rating: int
    text: str
    planName: str
    isApproved: bool = False
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)


# Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "English Grammar Books API - Ready to serve!", "version": "1.0"}


# Plans Endpoints
@api_router.get("/plans")
async def get_plans():
    try:
        plans_cursor = db.plans.find({"isActive": True})
        plans = await plans_cursor.to_list(length=100)
        
        # Serialize ObjectIds to strings
        serialized_plans = []
        for plan in plans:
            plan_dict = serialize_doc(plan)
            plan_dict["id"] = plan_dict["_id"]  # Use _id as id
            del plan_dict["_id"]
            serialized_plans.append(plan_dict)
        
        return {"success": True, "data": serialized_plans}
    except Exception as e:
        logging.error(f"Error fetching plans: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.get("/plans/{plan_id}")
async def get_plan(plan_id: str):
    try:
        plan = await db.plans.find_one({"_id": ObjectId(plan_id), "isActive": True})
        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")
        
        plan_dict = serialize_doc(plan)
        plan_dict["id"] = plan_dict["_id"]
        del plan_dict["_id"]
        
        return {"success": True, "data": plan_dict}
    except Exception as e:
        logging.error(f"Error fetching plan {plan_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# Orders Endpoints
@api_router.post("/orders")
async def create_order(order_data: OrderCreate):
    try:
        # Get plan details
        plan = await db.plans.find_one({"_id": ObjectId(order_data.planId), "isActive": True})
        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")
        
        # Generate unique order ID
        order_id = f"ORDER_{int(datetime.utcnow().timestamp())}"
        
        # Create order document
        order_doc = {
            "orderId": order_id,
            "customerEmail": order_data.customerEmail,
            "customerName": order_data.customerName,
            "planId": order_data.planId,
            "planName": plan["name"],
            "amount": plan["price"],
            "currency": plan["currency"],
            "paymentStatus": "pending",
            "paymentProof": order_data.paymentProof,
            "upiTransactionId": order_data.upiTransactionId,
            "downloadLinks": [],
            "downloadCount": 0,
            "maxDownloads": 5,
            "expiresAt": datetime.utcnow() + timedelta(days=30),  # 30 days expiry
            "isActive": True,
            "notes": order_data.notes,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        
        # Insert order
        result = await db.orders.insert_one(order_doc)
        
        return {
            "success": True, 
            "data": {
                "orderId": order_id,
                "message": "Order created successfully. You will receive download links within 2-4 hours after payment confirmation."
            }
        }
        
    except Exception as e:
        logging.error(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    try:
        order = await db.orders.find_one({"orderId": order_id, "isActive": True})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order_dict = serialize_doc(order)
        order_dict["id"] = order_dict["_id"]
        del order_dict["_id"]
        
        return {"success": True, "data": order_dict}
    except Exception as e:
        logging.error(f"Error fetching order {order_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.put("/orders/{order_id}/confirm")
async def confirm_order(order_id: str):
    try:
        # Find order
        order = await db.orders.find_one({"orderId": order_id, "isActive": True})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Generate download links (mock for now)
        plan = await db.plans.find_one({"_id": ObjectId(order["planId"])})
        download_links = []
        
        if plan:
            for file_path in plan.get("downloadFiles", []):
                # Create secure download token
                download_token = str(uuid.uuid4())
                download_url = f"/api/downloads/{order_id}/{download_token}"
                download_links.append(download_url)
        
        # Update order status
        update_data = {
            "paymentStatus": "confirmed",
            "downloadLinks": download_links,
            "updatedAt": datetime.utcnow()
        }
        
        await db.orders.update_one(
            {"orderId": order_id}, 
            {"$set": update_data}
        )
        
        return {
            "success": True, 
            "data": {
                "downloadLinks": download_links,
                "message": "Order confirmed successfully"
            }
        }
        
    except Exception as e:
        logging.error(f"Error confirming order {order_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# Testimonials Endpoints
@api_router.get("/testimonials")
async def get_testimonials():
    try:
        testimonials_cursor = db.testimonials.find({"isApproved": True, "isActive": True})
        testimonials = await testimonials_cursor.to_list(length=100)
        
        serialized_testimonials = []
        for testimonial in testimonials:
            testimonial_dict = serialize_doc(testimonial)
            testimonial_dict["id"] = testimonial_dict["_id"]
            del testimonial_dict["_id"]
            serialized_testimonials.append(testimonial_dict)
        
        return {"success": True, "data": serialized_testimonials}
    except Exception as e:
        logging.error(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.post("/testimonials")
async def create_testimonial(testimonial_data: TestimonialCreate):
    try:
        testimonial_doc = {
            "name": testimonial_data.name,
            "location": testimonial_data.location,
            "rating": testimonial_data.rating,
            "text": testimonial_data.text,
            "planName": testimonial_data.planName,
            "isApproved": False,  # Requires admin approval
            "isActive": True,
            "createdAt": datetime.utcnow()
        }
        
        result = await db.testimonials.insert_one(testimonial_doc)
        
        return {
            "success": True, 
            "message": "Thank you for your feedback! Your testimonial is under review."
        }
        
    except Exception as e:
        logging.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
