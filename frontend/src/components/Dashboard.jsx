import { useEffect, useState } from "react";

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://127.0.0.1:8000/dashboard", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch dashboard:", error);
            }
        };

        fetchDashboard();
    }, []);

    // --- Styling Objects ---
    const styles = {
        container: { maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "system-ui, -apple-system, sans-serif", color: "#1e293b" },
        title: { textAlign: "center", fontSize: "2.2rem", fontWeight: "bold", color: "#0f172a", marginBottom: "30px" },
        statsGrid: { display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" },
        statCard: { flex: "1 1 200px", backgroundColor: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" },
        statLabel: { fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", margin: "0 0 8px 0", fontWeight: "600" },
        statValue: { fontSize: "2.5rem", fontWeight: "800", color: "#2563eb", margin: "0" },
        sectionTitle: { fontSize: "1.5rem", fontWeight: "600", color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px", marginBottom: "20px" },
        historyCard: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", position: "relative" },
        badge: { position: "absolute", top: "24px", right: "24px", backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: "bold" },
        question: { fontSize: "1.125rem", fontWeight: "600", color: "#0f172a", margin: "0 0 12px 0", paddingRight: "70px" },
        label: { fontWeight: "bold", color: "#475569" },
        text: { color: "#334155", margin: "0 0 12px 0", lineHeight: "1.6" },
        feedbackBox: { backgroundColor: "#f0fdf4", borderLeft: "4px solid #22c55e", padding: "16px", borderRadius: "0 8px 8px 0", marginTop: "16px" },
        feedbackText: { color: "#166534", margin: 0, lineHeight: "1.6" },
        loading: { textAlign: "center", marginTop: "100px", fontSize: "1.25rem", color: "#64748b", fontWeight: "500" },
        messageBox: { textAlign: "center", padding: "20px", backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", borderRadius: "8px", maxWidth: "600px", margin: "60px auto" }
    };

    // --- Loading & Message States ---
    if (!data) {
        return <div style={styles.loading}>Loading your dashboard...</div>;
    }

    if (data.message) {
        return <div style={styles.messageBox}><h3>{data.message}</h3></div>;
    }

    // --- Main UI ---
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Performance Dashboard</h1>

            {/* Statistics Section */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <p style={styles.statLabel}>Questions Attempted</p>
                    <p style={styles.statValue}>{data.total_questions}</p>
                </div>
                <div style={styles.statCard}>
                    <p style={styles.statLabel}>Average Score</p>
                    <p style={styles.statValue}>{data.average_score}</p>
                </div>
            </div>

            {/* History Section */}
            <h2 style={styles.sectionTitle}>Interview History</h2>

            {data.history.map((item, index) => (
                <div key={index} style={styles.historyCard}>
                    {/* Score Badge */}
                    <div style={styles.badge}>Score: {item.score}/10</div>

                    {/* Q & A */}
                    <h3 style={styles.question}>Q: {item.question}</h3>
                    
                    <p style={styles.text}>
                        <span style={styles.label}>Your Answer: </span> 
                        {item.answer}
                    </p>

                    {/* Feedback Box */}
                    <div style={styles.feedbackBox}>
                        <p style={styles.feedbackText}>
                            <span style={{ fontWeight: "bold" }}>Feedback: </span>
                            {item.feedback}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;