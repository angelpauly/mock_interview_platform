export const fetchQuestionApi = async (
  role,
  experience,
  previousQuestions
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "http://127.0.0.1:8000/question",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        role,
        experience,
        previous_questions: previousQuestions
      })
    }
  );

  return res.json();
};

export const evaluateAnswerApi = async (
  question,
  answer
) => {
  const res = await fetch(
    "http://127.0.0.1:8000/evaluate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        answer
      })
    }
  );

  return res.json();
};