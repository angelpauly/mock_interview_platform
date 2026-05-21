import { useState } from "react";

function Signup() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleSignup = async () => {

        try {

            const res = await fetch(
                "http://127.0.0.1:8000/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await res.json();

            if (res.ok) {

                alert(data.message);

                setEmail("");

                setPassword("");

            } else {

                alert(data.detail || "Signup failed");
            }

        } catch (error) {

            console.log(error);

            alert("Server error");
        }
    };


    return (

        <div>

            <h2>Signup</h2>

            <input
                type="email"
                placeholder="Enter Email"

                value={email}

                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Enter Password"

                value={password}

                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={handleSignup}>
                Signup
            </button>

        </div>
    );
}

export default Signup;