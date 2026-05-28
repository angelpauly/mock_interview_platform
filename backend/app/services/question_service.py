import random

from app.core.database import questions_collection


def get_level(experience: str):

    experience = experience.lower().strip()

    if (
        "0" in experience
        or "fresher" in experience
    ):
        return "fresher"

    return "experienced"


def fetch_question(role, experience, previous):

    level = get_level(experience)

    print("\n========== DEBUG ==========")
    print("ROLE:", role)
    print("EXPERIENCE:", experience)
    print("LEVEL:", level)

    db_questions = list(
        questions_collection.find({
            "role": role,
            "level": level
        })
    )

    print("QUESTIONS FOUND:", len(db_questions))

    available = [
        q for q in db_questions
        if q["question"] not in previous
    ]

    print("AVAILABLE QUESTIONS:", len(available))

    if not available:
        return "Interview completed"

    selected = random.choice(available)

    print("SELECTED:", selected["question"])
    print("===========================\n")

    return selected["question"]