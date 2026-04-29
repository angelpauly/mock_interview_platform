import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showSignup, setShowSignup] = useState(false);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [session, setSession] = useState([]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const [started, setStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUserEmail(payload.sub);
    setIsLoggedIn(true);
  }
}, []);

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
    setAttempts(0);
    setShowResult(false);

    const token = localStorage.getItem("token");  // ✅ outside

const res = await fetch("http://127.0.0.1:8000/question", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`  // ✅ correct
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

    setTimeLeft(60);
    setTimerActive(true);
  };

  // 🔹 Timer Logic
  useEffect(() => {
    if (!timerActive) return;

    if (timeLeft === 0) {
      setTimerActive(false);
      alert("Time's up!");

      if (answer) {
        handleSubmit();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  // 🔹 Retry
  const handleRetry = () => {
    if (attempts >= 2) {
      alert("Maximum attempts reached!");
      return;
    }

    setAnswer("");
    setScore(null);
    setFeedback("");
    setShowResult(false);

    setTimeLeft(60);
    setTimerActive(true);
  };

  // 🔹 Submit
  const handleSubmit = async () => {
    if (!answer) {
      alert("Please enter an answer");
      return;
    }

    if (attempts >= 2) {
      alert("Maximum attempts reached!");
      return;
    }

    setTimerActive(false);
    setShowResult(true);

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

    const newAttempt = attempts + 1;
    setAttempts(newAttempt);

    setScore(data.score);
    setFeedback(data.feedback);

    setSession([
      ...session,
      {
        question,
        answer,
        score: data.score,
        attempt: newAttempt
      }
    ]);
  };

  <button onClick={() => {
  localStorage.removeItem("token");
  window.location.reload();
}}>
  Logout
</button>

  if (!isLoggedIn) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {showSignup ? (
        <Signup />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}

      <br />

      <button onClick={() => setShowSignup(!showSignup)}>
        {showSignup ? "Go to Login" : "Go to Signup"}
      </button>

      <h3>Welcome {userEmail}</h3>
      
    </div>
    

    
  );
}

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
              <h3>Time Left: {timeLeft}s</h3>

              <h3>{question}</h3>

              <textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows="5"
                cols="50"
              />

              <br /><br />

              {!showResult && (
                <button onClick={handleSubmit}>
                  Submit Answer
                </button>
              )}

              {showResult && (
                <>
                  <h3>Score: {score}/10</h3>
                  <p>{feedback}</p>

                  <br />

                  {attempts < 2 ? (
                    <>
                      <button onClick={handleRetry}>
                        Retry Answer
                      </button>

                      <button onClick={fetchQuestion}>
                        Next Question
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Maximum attempts reached.</p>

                      <button onClick={fetchQuestion}>
                        Next Question
                      </button>
                    </>
                  )}
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
                <strong>Score:</strong> {item.score} <br />
                <strong>Attempt:</strong> {item.attempt}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;