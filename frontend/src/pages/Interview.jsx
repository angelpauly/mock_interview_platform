import { useState, useEffect } from "react";

import InterviewSetup from "../components/InterviewSetup";
import Instructions from "../components/Instructions";
import QuestionSection from "../components/QuestionSection";
import SessionHistory from "../components/SessionHistory";

import {
    fetchQuestionApi,
    evaluateAnswerApi
} from "../services/api";

function Interview() {

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

    const [completed, setCompleted] = useState(false);

    // START INTERVIEW

    const startInterview = () => {

        if (!role || !experience) {

            alert("Please select role and experience");

            return;
        }

        setStarted(true);
    };

    // FETCH QUESTION

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

        if (
            data.question === "Interview completed"
        ) {

            setCompleted(true);

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

    // TIMER

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

    }, [timeLeft, timerActive, answer]);

    // RETRY

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

    // SUBMIT

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
        const token = localStorage.getItem("token");

const payload = JSON.parse(
    atob(token.split(".")[1])
);

await fetch(
    "http://127.0.0.1:8000/save-history",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            user_email: payload.sub,

            question: question,

            answer: answer,

            score: data.score,

            feedback: data.feedback
        })
    }
);

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

    // COMPLETED SCREEN

    if (completed) {

        return (

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

                <h1 className="text-5xl font-bold mb-6">
                    Interview Completed
                </h1>

                <p className="text-2xl mb-10">
                    Great Job 🚀
                </p>

                <button
                    onClick={() => {
                        window.location.href = "/dashboard";
                    }}

                    className="bg-blue-500 text-white px-8 py-4 rounded-lg"
                >
                    Go To Dashboard
                </button>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}

            <nav className="bg-black text-white p-4 flex justify-between">

                <h1 className="text-2xl font-bold">
                    Mock Interview Platform
                </h1>

                <button
                    onClick={() => {

                        localStorage.removeItem("token");

                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>

            </nav>


            <div className="max-w-5xl mx-auto p-10">

                {
                    !started
                    ? (

                        <InterviewSetup
                            role={role}
                            setRole={setRole}
                            experience={experience}
                            setExperience={setExperience}
                            startInterview={startInterview}
                        />

                    )
                    : (

                        <>

                            {
                                question === ""
                                && (

                                    <Instructions
                                        fetchQuestion={fetchQuestion}
                                    />

                                )
                            }

                            {
                                question
                                && (

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

                                )
                            }

                            <div className="mt-20">

                                

                            </div>

                        </>

                    )
                }

            </div>

        </div>
    );
}

export default Interview;