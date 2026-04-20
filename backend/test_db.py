from app.core.config import db

db.questions.insert_many([
    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is a linked list?",
        "keywords": ["node", "pointer"],
        "ideal_answer": "A linked list is a linear data structure..."
    },
    {
        "role": "SDE",
        "level": "fresher",
        "question": "Explain stack vs queue.",
        "keywords": ["LIFO", "FIFO"],
        "ideal_answer": "Stack follows LIFO, Queue follows FIFO..."
    }
])

print("Inserted!")