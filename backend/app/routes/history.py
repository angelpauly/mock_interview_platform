from fastapi import APIRouter

from app.models.schemas import HistoryRequest

from app.core.database import history_collection

router = APIRouter()


@router.post("/save-history")
def save_history(data: HistoryRequest):

    history_collection.insert_one({

        "user_email": data.user_email,

        "question": data.question,

        "answer": data.answer,

        "score": data.score,

        "feedback": data.feedback
    })

    return {
        "message": "History saved"
    }