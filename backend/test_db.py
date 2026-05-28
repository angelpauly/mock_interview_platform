from app.core.database import questions_collection

questions = list(
    questions_collection.find()
)

print(len(questions))