import { useEffect, useState } from "react";

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

            const token = localStorage.getItem("token");

            const res = await fetch(
                "http://127.0.0.1:8000/dashboard",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const result = await res.json();

            setData(result);
        };

        fetchDashboard();

    }, []);

    if (!data) {
        return <h2>Loading...</h2>;
    }

    if (data.message) {
        return <h2>{data.message}</h2>;
    }

    return (

        <div style={{ marginTop: "40px" }}>

            <h2>Dashboard</h2>

            <h3>Total Questions Attempted: {data.total_questions}</h3>

            <h3>Average Score: {data.average_score}</h3>

            <hr />

            <h2>Interview History</h2>

            {
                data.history.map((item, index) => (

                    <div
                        key={index}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <p>
                            <strong>Question:</strong>
                            {" "}
                            {item.question}
                        </p>

                        <p>
                            <strong>Answer:</strong>
                            {" "}
                            {item.answer}
                        </p>

                        <p>
                            <strong>Score:</strong>
                            {" "}
                            {item.score}/10
                        </p>

                        <p>
                            <strong>Feedback:</strong>
                            {" "}
                            {item.feedback}
                        </p>

                    </div>
                ))
            }

        </div>
    );
}

export default Dashboard;