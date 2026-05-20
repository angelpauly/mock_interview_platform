from fastapi import APIRouter, Depends

from app.services.auth_service import (
    get_current_user
)

from app.core.database import (
    history_collection
)

router = APIRouter()


@router.get("/dashboard")
def dashboard(
    user: str = Depends(get_current_user)
):

    history = list(
        history_collection.find({
            "user_email": user
        })
    )

    total_questions = len(history)

    if total_questions == 0:
        return {
            "message": "No interview history found"
        }

    average_score = sum(
        item["score"]
        for item in history
    ) / total_questions

    return {
        "total_questions": total_questions,
        "average_score": round(average_score, 2),
        "history": history
    }