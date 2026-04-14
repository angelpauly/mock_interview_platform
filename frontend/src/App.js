import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [question, setQuestion] = useState("");
  const [answer,setAnswer] = useState("");
  const [score, setScore]= useState(null);
  const [feedback, setFeedback]= useState("");

  const fetchQuestion = async () => {
    const res = await fetch("http://127.0.0.1:8000/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ role, experience })
    });

    const data = await res.json();
    setQuestion(data.question);

    setScore(null);
    setFeedback("");
    setAnswer("");
  };

  const submitAnswer = async () => {
    const res = await fetch("http://127.0.0.1:8000/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({answer})
    });
    const data=await res.json();
    setScore(data.score);
    setFeedback(data.feedback);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mock Interview Platform</h1>

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

      <button onClick={fetchQuestion}>
        Generate Question
      </button>

      <p style={{ marginTop: "20px" }}>{question}</p>

      <textarea
        placeholder="Type your answer here..."
        value ={answer}
        onChange={(e)=> setAnswer(e.target.value)}
        row="5"
        cols="50"
      />

      <button onClick={submitAnswer}>
        Submit Answer
      </button>

      {score !==null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Score: {score}/10</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default App;