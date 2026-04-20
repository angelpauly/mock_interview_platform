from fastapi import APIRouter
from app.models.schemas import AnswerRequest
from app.services.evaluation_service import evaluate_answer

router = APIRouter()

@router.post("/evaluate")
def evaluate(data: AnswerRequest):
    score, feedback = evaluate_answer(
        data.question,
        data.answer
    )

    return {
        "score": score,
        "feedback": feedback
    }