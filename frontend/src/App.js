import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [session, setSession] = useState([]);

  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [timerActive, setTimerActive] = useState(false);

  const [started, setStarted] = useState(false);

  // 🔹 Start Interview
  const startInterview = () => {
    if (!role || !experience) {
      alert("Please select role and experience");
      return;
    }

    setStarted(true);
  };

  // 🔹 Fetch Question
  const fetchQuestion = async () => {
    setAnswer("");
    setScore(null);
    setFeedback("");
    setTimeLeft(60);
    setTimerActive(true);

    const res = await fetch("http://127.0.0.1:8000/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role,
        experience,
        previous_questions: previousQuestions
      })
    });

    const data = await res.json();

    if (data.question === "Interview completed") {
      alert("Interview completed!");
      return;
    }

    setQuestion(data.question);
    setPreviousQuestions([...previousQuestions, data.question]);
  };

  // 🔹 Submit Answer
  const submitAnswer = async () => {
    if (!answer) {
      alert("Please enter an answer");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question,
        answer: answer
      })
    });

    const data = await res.json();

    setScore(data.score);
    setFeedback(data.feedback);

    setSession([
      ...session,
      {
        question: question,
        answer: answer,
        score: data.score
      }
    ]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mock Interview Platform</h1>

      {!started ? (
        <>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="SDE">SDE</option>
            <option value="HR">HR</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>

          <br /><br />

          <input
            type="text"
            placeholder="Enter experience (e.g. 2 years)"
            onChange={(e) => setExperience(e.target.value)}
          />

          <br /><br />

          <button onClick={startInterview}>
            Start Interview
          </button>
        </>
      ) : (
        <>
          {/* Instructions */}
          {question === "" && (
            <>
              <h3>Instructions</h3>
              <p>You will be asked 10 questions.</p>
              <p>Answer carefully. All the best! 🚀</p>

              <button onClick={fetchQuestion}>
                Start Practice
              </button>
            </>
          )}

          {/* Question Section */}
          {question && (
            <>
              <h3>{question}</h3>

              <textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows="5"
                cols="50"
              />

              <br /><br />

              <button onClick={submitAnswer}>
                Submit Answer
              </button>

              <br /><br />

              {score !== null && (
                <>
                  <h3>Score: {score}/10</h3>
                  <p>{feedback}</p>

                  <button onClick={fetchQuestion}>
                    Next Question
                  </button>
                </>
              )}
            </>
          )}

          {/* Session History */}
          <h3>Session History</h3>
          <ul>
            {session.map((item, index) => (
              <li key={index}>
                <strong>Q:</strong> {item.question} <br />
                <strong>Score:</strong> {item.score}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;