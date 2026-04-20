from pydantic import BaseModel
from typing import List

class InterviewRequest(BaseModel):
    role: str
    experience: str
    previous_questions: List[str] = []

class AnswerRequest(BaseModel):
    answer: str
    question: str