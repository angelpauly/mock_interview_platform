import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="min-h-screen bg-gray-100">

            <nav className="bg-black text-white p-4 flex justify-between">

                <h1 className="text-2xl font-bold">
                    Mock Interview Platform
                </h1>

                <div className="flex gap-4">

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <button
                        onClick={() => {

                            localStorage.removeItem("token");

                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            <div className="flex flex-col items-center justify-center mt-20">

                <h2 className="text-4xl font-bold mb-10">
                    Welcome
                </h2>

                <Link
                    to="/interview"

                    className="bg-blue-500 text-white px-8 py-4 rounded-lg"
                >
                    Start Interview
                </Link>

            </div>

        </div>
    );
}

export default Home;