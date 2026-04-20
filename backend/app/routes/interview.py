from fastapi import APIRouter
from app.models.schemas import InterviewRequest
from app.services.question_service import fetch_question

router = APIRouter()

@router.post("/question")
def get_question(data: InterviewRequest):
    question = fetch_question(
        data.role,
        data.experience,
        data.previous_questions
    )

    return {"question": question}