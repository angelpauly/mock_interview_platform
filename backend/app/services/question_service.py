import random

questions = {
    "SDE": {
        "fresher": [
            "What is a linked list?",
            "Explain stack vs queue.",
            "What is time complexity?",
            "What is OOP?"
        ],
        "experienced": [
            "Explain how a hash table works.",
            "What is multithreading?",
            "Design a URL shortener."
        ]
    }
}

def get_level(experience: str):
    if "0" in experience or "fresher" in experience.lower():
        return "fresher"
    return "experienced"


def fetch_question(role, experience, previous):
    if role not in questions:
        return "Invalid role selected"

    level = get_level(experience)

    available = [
        q for q in questions[role][level] if q not in previous
    ]

    if not available:
        return "Interview Completed"

    return random.choice(available)