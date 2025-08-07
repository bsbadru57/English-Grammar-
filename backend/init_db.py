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
        "description": "Essential English grammar foundations that will help you speak better English with confidence",
        "features": [
            "Core grammar rules for better speaking",
            "Sentence formation techniques for clear communication", 
            "Proper use of tenses in daily conversation",
            "Parts of speech with speaking examples",
            "Common grammar mistakes that affect speaking",
            "Simple to complex sentence structures",
            "Speaking-focused grammar exercises",
            "Real-life conversation grammar patterns",
            "Foundation for fluent English speaking",
            "PDF format for easy learning",
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
        "description": "Build confidence and speak English fluently with practical examples and real conversation techniques",
        "features": [
            "Confidence-building speaking techniques",
            "Daily English conversation starters",
            "100+ practical speaking examples", 
            "How to express opinions confidently",
            "Overcoming speaking anxiety methods",
            "Business meeting conversation skills",
            "Social interaction English phrases",
            "Telephone and video call English",
            "Job interview confidence techniques",
            "Public speaking in English basics",
            "Audio pronunciation guide included",
            "Practice dialogues with examples",
            "Speaking fluency improvement tips",
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
        "description": "Master how to speak English properly like a native speaker and become an expert in English communication",
        "features": [
            "🎉 INCLUDES Basic Plan (FREE - $2 value)",
            "🎉 INCLUDES Expert Plan (FREE - $5 value)", 
            "Native-level English speaking techniques",
            "Advanced pronunciation and accent training",
            "Professional presentation skills in English",
            "Sophisticated vocabulary for expert communication",
            "How to think and speak in English naturally",
            "Advanced conversation flow techniques",
            "Cultural context and natural expressions",
            "Leadership communication in English",
            "Academic and intellectual discussions",
            "Creative storytelling and narrative skills",
            "Advanced grammar for eloquent speaking",
            "International English communication standards",
            "Expert-level writing that enhances speaking",
            "Personal coaching guidance included",
            "Exclusive advanced speaking modules",
            "Priority email support",
            "Lifetime access to all expert content"
        ],
        "isPopular": False,
        "isBestValue": True,
        "downloadFiles": [
            "/files/basic-grammar-book.pdf",
            "/files/expert-english-book.pdf", 
            "/files/audio-pronunciation-guide.zip",
            "/files/legend-advanced-grammar.pdf",
            "/files/native-speaking-techniques.pdf",
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