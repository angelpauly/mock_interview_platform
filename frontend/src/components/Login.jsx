import { useState } from "react";

function Login() {

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

            console.log(data);

            if (data.access_token) {

                localStorage.setItem(
                    "token",
                    data.access_token
                );

                window.location.href = "/home";

            } else {

                alert(data.detail || "Login failed");
            }

        } catch (error) {

            console.log(error);

            alert("Server Error");
        }
    };

    return (

        <div className="flex flex-col">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Login
            </h2>

            <input
                type="email"
                placeholder="Enter Email"

                className="border p-3 rounded mb-4"

                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Enter Password"

                className="border p-3 rounded mb-4"

                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}

                className="bg-blue-500 text-white py-3 rounded"
            >
                Login
            </button>

        </div>
    );
}

export default Login;