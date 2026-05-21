function QuestionSection({
  question,
  answer,
  setAnswer,
  timeLeft,
  handleSubmit,
  showResult,
  score,
  feedback,
  attempts,
  handleRetry,
  fetchQuestion
}) {
  return (
    <>
      <h3>Time Left: {timeLeft}s</h3>

      <h3>{question}</h3>

      <textarea
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="5"
        cols="50"
      />

      <br />
      <br />

      {!showResult && (
        <button onClick={handleSubmit}>
          Submit Answer
        </button>
      )}

      {showResult && (
        <>
          <h3>Score: {score}/10</h3>

          <p>{feedback}</p>

          <br />

          {attempts < 2 ? (
            <>
              <button onClick={handleRetry}>
                Retry Answer
              </button>

              <button onClick={fetchQuestion}>
                Next Question
              </button>
            </>
          ) : (
            <>
              <p>Maximum attempts reached.</p>

              <button onClick={fetchQuestion}>
                Next Question
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default QuestionSection;