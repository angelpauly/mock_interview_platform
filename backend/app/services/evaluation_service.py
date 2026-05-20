from sklearn.feature_extraction.text import (
    TfidfVectorizer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from app.core.database import (
    questions_collection
)


def evaluate_answer(question: str, answer: str):

    answer = answer.lower()

    # Find question in DB
    db_question = questions_collection.find_one({
        "question": question
    })

    if not db_question:
        return 5, "Question not found in database."

    ideal = db_question["ideal_answer"].lower()

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform([
        answer,
        ideal
    ])

    similarity = cosine_similarity(
        vectors[0],
        vectors[1]
    )[0][0]

    score = int(similarity * 10)

    if score < 4:
        feedback = (
            "Your answer is not aligned "
            "with expected concepts."
        )

    elif score < 7:
        feedback = (
            "Decent answer but can "
            "be improved."
        )

    else:
        feedback = (
            "Good answer with strong relevance."
        )

    return score, feedback