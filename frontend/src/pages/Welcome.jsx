import { useState } from "react";

import Login from "../components/Login";
import Signup from "../components/Signup";

function Welcome() {

    const [showSignup, setShowSignup] = useState(false);

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

            <h1 className="text-5xl font-bold mb-10">
                Mock Interview Platform
            </h1>

            <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">

                {
                    showSignup
                    ? <Signup />
                    : <Login />
                }

                <button
                    onClick={() =>
                        setShowSignup(!showSignup)
                    }

                    className="mt-6 text-blue-500"
                >
                    {
                        showSignup
                        ? "Already have an account?"
                        : "Create new account"
                    }
                </button>

            </div>

        </div>
    );
}

export default Welcome;