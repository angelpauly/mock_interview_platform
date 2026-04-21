from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Temporary ideal answers (later from DB)
ideal_answers = {
    "What is a linked list?": "A linked list is a linear data structure where elements are connected using pointers.",
    "Explain stack vs queue.": "Stack follows LIFO while queue follows FIFO."
}


def evaluate_answer(question: str, answer: str):
    answer = answer.lower()

    ideal = ideal_answers.get(question, "")

    if not ideal:
        return 5, "No reference answer available."

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform([answer, ideal])

    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]

    score = int(similarity * 10)

    # feedback logic
    if score < 4:
        feedback = "Your answer is not aligned with expected concepts."
    elif score < 7:
        feedback = "Decent answer but can be improved."
    else:
        feedback = "Good answer with strong relevance."

    return score, feedback