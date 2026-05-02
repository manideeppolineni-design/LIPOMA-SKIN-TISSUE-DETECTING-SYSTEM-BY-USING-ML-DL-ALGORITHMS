from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGODB_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGODB_URL)
db = client.lipoma_db

async def get_database():
    return db
