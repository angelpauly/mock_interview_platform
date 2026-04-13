import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");

  const fetchQuestion = async () => {
    
    const res = await fetch("http://localhost:8000/question");
    //fetch("http://127.0.0.1:8000/question");
    const data = await res.json();
    setQuestion(data.question);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mock Interview Platform</h1>

      <button onClick={fetchQuestion}>
        Generate Question
      </button>

      <p style={{ marginTop: "20px" }}>
        {question}
      </p>
    </div>
  );
}

export default App;