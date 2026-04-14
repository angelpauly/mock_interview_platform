from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# 👇 Define request body structure
class InterviewRequest(BaseModel):
    role: str
    experience: str

class AnswerRequest(BaseModel):
    answer: str

questions = {
    "SDE": {
        "fresher": [
            "What is a linked list?",
            "Explain stack vs queue.",
            "What is time complexity?",
            "What is OOP?"
        ],
        "experienced": [
            "Explain how a hash table works internally.",
            "What is the difference between multithreading and multiprocessing?",
            "How does garbage collection work?",
            "Design a scalable system for a URL shortener."
        ]
    },
    "HR": {
        "fresher": [
            "Tell me about yourself.",
            "Why do you want this job?",
            "What are your strengths and weaknesses?"
        ],
        "experienced": [
            "Describe a challenging situation at work.",
            "How do you handle conflict in a team?",
            "Why are you switching jobs?"
        ]
    },
    "Data Analyst": {
        "fresher": [
            "What is data cleaning?",
            "Explain mean, median, and mode.",
            "What is Excel used for?"
        ],
        "experienced": [
            "Explain the data analysis lifecycle.",
            "How do you handle missing data?",
            "What is the difference between supervised and unsupervised learning?"
        ]
    }
}

# API endpoint
@app.post("/question")
def get_question(data: InterviewRequest):
    role = data.role
    experience = data.experience.lower()

    # Decide level based on experience
    if "0" in experience or "fresher" in experience:
        level = "fresher"
    else:
        level = "experienced"

    # Handle invalid role
    if role not in questions:
        return {"question": "Invalid role selected"}

    # Pick random question
    question = random.choice(questions[role][level])

    return {"question": question}

@app.post("/evaluate")
def evaluate(data: AnswerRequest):
    answer = data.answer.lower()

    score = 0
    feedback = ""

    # Length check
    if len(answer) < 20:
        feedback = "Answer too short. Try to elaborate."
        score = 2
    elif len(answer) < 50:
        feedback = "Decent answer but needs more depth."
        score = 5
    else:
        feedback = "Good detailed answer."
        score = 8

    # Keyword bonus
    keywords = ["data", "structure", "algorithm", "process"]

    keyword_count = sum(1 for word in keywords if word in answer)

    score += keyword_count

    if score > 10:
        score = 10

    return {
        "score": score,
        "feedback": feedback
    }