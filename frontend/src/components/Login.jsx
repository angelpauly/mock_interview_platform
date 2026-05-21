import { useState } from "react";

function Login({ setIsLoggedIn }) {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleLogin = async () => {

        try {

            const res = await fetch(
                "http://127.0.0.1:8000/login",
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

            if (data.access_token) {

                // Save JWT token
                localStorage.setItem(
                    "token",
                    data.access_token
                );

                setIsLoggedIn(true);

                alert("Login successful");

            } else {

                alert(data.detail || "Login failed");
            }

        } catch (error) {

            console.log(error);

            alert("Server error");
        }
    };


    return (

        <div>

            <h2>Login</h2>

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

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
}

export default Login;