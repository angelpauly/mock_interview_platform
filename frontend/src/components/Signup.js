import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;