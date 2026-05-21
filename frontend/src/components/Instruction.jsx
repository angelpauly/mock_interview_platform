function Instructions({ fetchQuestion }) {
  return (
    <>
      <h3>Instructions</h3>

      <p>You will be asked 10 questions.</p>

      <p>
        Answer carefully. All the best! 🚀
      </p>

      <button onClick={fetchQuestion}>
        Start Practice
      </button>
    </>
  );
}

export default Instructions;