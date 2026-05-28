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

            console.log(data);

            if (res.status === 200) {

                alert("Signup Successful");

            } else {

                alert(data.detail || "Signup failed");
            }

        } catch (error) {

            console.log(error);

            alert("Server Error");
        }
    };

    return (

        <div className="flex flex-col">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Signup
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
                onClick={handleSignup}

                className="bg-green-500 text-white py-3 rounded"
            >
                Signup
            </button>

        </div>
    );
}

export default Signup;