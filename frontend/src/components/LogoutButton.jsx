function LogoutButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;