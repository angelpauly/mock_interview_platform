import random

from app.core.database import questions_collection


def get_level(experience: str):

    if (
        "0" in experience
        or "fresher" in experience.lower()
    ):
        return "fresher"

    return "experienced"


def fetch_question(role, experience, previous):

    level = get_level(experience)

    # Fetch questions from MongoDB
    db_questions = list(
        questions_collection.find({
            "role": role,
            "level": level
        })
    )

    available = [
        q for q in db_questions
        if q["question"] not in previous
    ]

    if not available:
        return "Interview completed"

    selected = random.choice(available)

    return selected["question"]