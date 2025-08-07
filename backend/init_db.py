#!/usr/bin/env python3

import asyncio
import sys
import os
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from dotenv import load_dotenv

# Add backend directory to path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample plans data
PLANS_DATA = [
    {
        "name": "Basic Plan",
        "price": 2.0,
        "currency": "$",
        "originalPrice": None,
        "description": "Perfect for beginners who want to master the fundamentals of English grammar",
        "features": [
            "All basic grammar rules and concepts",
            "Simple sentence structures", 
            "Parts of speech (nouns, verbs, adjectives, etc.)",
            "Basic tenses and verb forms",
            "Common grammar mistakes to avoid",
            "Practice exercises with answers",
            "PDF format for easy reading",
            "Lifetime access"
        ],
        "isPopular": False,
        "isBestValue": False,
        "downloadFiles": ["/files/basic-grammar-book.pdf"],
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Expert Plan",
        "price": 5.0,
        "currency": "$",
        "originalPrice": None,
        "description": "For intermediate learners who want to improve their daily English conversation",
        "features": [
            "Daily basic English spoken lines",
            "Common conversational phrases",
            "Everyday expressions and idioms", 
            "Business English basics",
            "Email writing guidelines",
            "Grammar for speaking fluently",
            "Pronunciation tips and tricks",
            "Audio pronunciation guide",
            "Practice dialogues",
            "Lifetime access"
        ],
        "isPopular": True,
        "isBestValue": False,
        "downloadFiles": ["/files/expert-english-book.pdf", "/files/audio-pronunciation-guide.zip"],
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Legend Plan",
        "price": 15.0,
        "currency": "$",
        "originalPrice": 22.0,
        "description": "The ultimate package - Everything you need to become an English master",
        "features": [
            "🎉 INCLUDES Basic Plan (FREE - $2 value)",
            "🎉 INCLUDES Expert Plan (FREE - $5 value)", 
            "Advanced grammar concepts",
            "Complex sentence structures",
            "Professional writing techniques",
            "Advanced speaking patterns",
            "Academic English skills",
            "Literature and creative writing",
            "Advanced vocabulary building",
            "Grammar for IELTS/TOEFL prep",
            "Exclusive bonus materials",
            "Priority email support",
            "Lifetime access to all content"
        ],
        "isPopular": False,
        "isBestValue": True,
        "downloadFiles": [
            "/files/basic-grammar-book.pdf",
            "/files/expert-english-book.pdf", 
            "/files/audio-pronunciation-guide.zip",
            "/files/legend-advanced-grammar.pdf",
            "/files/bonus-materials.zip"
        ],
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
]

# Sample testimonials data
TESTIMONIALS_DATA = [
    {
        "name": "Priya Sharma",
        "location": "Mumbai, India",
        "rating": 5,
        "text": "The Basic Plan helped me understand grammar fundamentals that I struggled with for years. Highly recommended for beginners!",
        "planName": "Basic Plan",
        "isApproved": True,
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "name": "Rajesh Kumar",
        "location": "Delhi, India",
        "rating": 5,
        "text": "Expert Plan improved my daily English conversation significantly. The spoken lines and phrases are very practical.",
        "planName": "Expert Plan",
        "isApproved": True,
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "name": "Anita Patel",
        "location": "Bangalore, India", 
        "rating": 5,
        "text": "Legend Plan is amazing! Getting all three books for just $15 was incredible value. My English has transformed completely.",
        "planName": "Legend Plan",
        "isApproved": True,
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "name": "Mohammed Hassan",
        "location": "Dubai, UAE",
        "rating": 5,
        "text": "Professional quality content at an affordable price. The pronunciation guide in Expert Plan was exactly what I needed.",
        "planName": "Expert Plan",
        "isApproved": True,
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "name": "Sarah Johnson",
        "location": "London, UK",
        "rating": 4,
        "text": "Great value for money. The Legend Plan covers everything from basics to advanced concepts. Highly recommend!",
        "planName": "Legend Plan",
        "isApproved": True,
        "isActive": True,
        "createdAt": datetime.utcnow()
    }
]

async def init_database():
    """Initialize the database with sample data."""
    try:
        print("🔄 Initializing database...")
        
        # Clear existing data
        await db.plans.delete_many({})
        await db.testimonials.delete_many({})
        print("✅ Cleared existing data")
        
        # Insert plans
        result = await db.plans.insert_many(PLANS_DATA)
        print(f"✅ Inserted {len(result.inserted_ids)} plans")
        
        # Insert testimonials
        result = await db.testimonials.insert_many(TESTIMONIALS_DATA)
        print(f"✅ Inserted {len(result.inserted_ids)} testimonials")
        
        # Create indexes for better performance
        await db.plans.create_index("name")
        await db.plans.create_index("isActive")
        await db.orders.create_index("orderId", unique=True)
        await db.orders.create_index("customerEmail")
        await db.testimonials.create_index("isApproved")
        print("✅ Created database indexes")
        
        print("🎉 Database initialization completed successfully!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        sys.exit(1)
    finally:
        client.close()

if __name__ == "__main__":
    print("🚀 Starting database initialization...")
    asyncio.run(init_database())