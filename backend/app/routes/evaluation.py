from fastapi import APIRouter, Depends

from app.models.schemas import AnswerRequest

from app.services.evaluation_service import (
    evaluate_answer
)

from app.services.auth_service import (
    get_current_user
)

from app.core.database import (
    history_collection
)

router = APIRouter()


@router.post("/evaluate")
def evaluate(
    data: AnswerRequest,
    user: str = Depends(get_current_user)
):

    score, feedback = evaluate_answer(
        data.question,
        data.answer
    )

    # Save history
    history_collection.insert_one({
        "user_email": user,
        "question": data.question,
        "answer": data.answer,
        "score": score,
        "feedback": feedback
    })

    return {
        "score": score,
        "feedback": feedback
    }