import { useState, useEffect } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import InterviewSetup from "./components/InterviewSetup";
import Instructions from "./components/Instructions";
import QuestionSection from "./components/QuestionSection";
import SessionHistory from "./components/SessionHistory";
import LogoutButton from "./components/LogoutButton";

import {
  fetchQuestionApi,
  evaluateAnswerApi
} from "./services/api";

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

  const startInterview = () => {
    if (!role || !experience) {
      alert("Please select role and experience");
      return;
    }

    setStarted(true);
  };

  const fetchQuestion = async () => {
    setAnswer("");
    setScore(null);
    setFeedback("");
    setAttempts(0);
    setShowResult(false);

    const data = await fetchQuestionApi(
      role,
      experience,
      previousQuestions
    );

    if (data.question === "Interview completed") {
      alert("Interview completed!");
      return;
    }

    setQuestion(data.question);

    setPreviousQuestions((prev) => [
      ...prev,
      data.question
    ]);

    setTimeLeft(60);
    setTimerActive(true);
  };

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

    const data = await evaluateAnswerApi(
      question,
      answer
    );

    const newAttempt = attempts + 1;

    setAttempts(newAttempt);

    setScore(data.score);
    setFeedback(data.feedback);

    setSession((prev) => [
      ...prev,
      {
        question,
        answer,
        score: data.score,
        attempt: newAttempt
      }
    ]);
  };

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

      <LogoutButton />

      {!started ? (
        <InterviewSetup
          role={role}
          setRole={setRole}
          experience={experience}
          setExperience={setExperience}
          startInterview={startInterview}
        />
      ) : (
        <>
          {question === "" && (
            <Instructions fetchQuestion={fetchQuestion} />
          )}

          {question && (
            <QuestionSection
              question={question}
              answer={answer}
              setAnswer={setAnswer}
              timeLeft={timeLeft}
              handleSubmit={handleSubmit}
              showResult={showResult}
              score={score}
              feedback={feedback}
              attempts={attempts}
              handleRetry={handleRetry}
              fetchQuestion={fetchQuestion}
            />
          )}

          <SessionHistory session={session} />
        </>
      )}
    </div>
  );
}

export default App;