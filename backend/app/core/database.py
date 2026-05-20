from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

print("MongoDB Connected Successfully")

db = client["mock_interview_db"]

users_collection = db["users"]

questions_collection = db["questions"]

history_collection = db["history"]