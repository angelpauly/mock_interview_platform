function SessionHistory({ session }) {
  return (
    <>
      <h3>Session History</h3>

      <ul>
        {session.map((item, index) => (
          <li key={index}>
            <strong>Q:</strong> {item.question}

            <br />

            <strong>Score:</strong> {item.score}

            <br />

            <strong>Attempt:</strong> {item.attempt}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SessionHistory;