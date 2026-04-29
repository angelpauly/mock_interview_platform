from fastapi import APIRouter, Depends
from app.models.schemas import InterviewRequest
from app.services.question_service import fetch_question
from app.services.auth_service import get_current_user  # ✅ import this

router = APIRouter()

@router.post("/question")
def get_question(
    data: InterviewRequest,
    user: str = Depends(get_current_user)   # ✅ add this line
):
    print(f"{user} is taking interview")
    
    question = fetch_question(
        data.role,
        data.experience,
        data.previous_questions
    )
    

    return {
        "question": question,
        "user": user   # (optional) helpful for testing
    }