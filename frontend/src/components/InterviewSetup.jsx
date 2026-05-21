function InterviewSetup({
  role,
  setRole,
  experience,
  setExperience,
  startInterview
}) {
  return (
    <>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="SDE">SDE</option>
        <option value="HR">HR</option>
        <option value="Data Analyst">Data Analyst</option>
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter experience (e.g. 2 years)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <br />
      <br />

      <button onClick={startInterview}>
        Start Interview
      </button>
    </>
  );
}

export default InterviewSetup;