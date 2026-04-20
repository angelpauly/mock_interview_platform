def evaluate_answer(question: str, answer: str):
    answer = answer.lower()

    score = 0
    feedback = []

    # Length scoring
    if len(answer) < 30:
        score += 2
        feedback.append("Answer is too short.")
    elif len(answer) < 80:
        score += 5
        feedback.append("Decent answer.")
    else:
        score += 8
        feedback.append("Well detailed answer.")

    # Logic indicators
    if "because" in answer or "therefore" in answer:
        score += 1
        feedback.append("Good explanation flow.")

    if "example" in answer:
        score += 1
        feedback.append("Good use of examples.")

    if score > 10:
        score = 10

    return score, " ".join(feedback)