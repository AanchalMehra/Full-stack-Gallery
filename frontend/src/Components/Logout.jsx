import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // remove role, token, etc.
    navigate("/login");   // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-5 py-2.5
        bg-rose-500 text-white
        rounded-full
        font-semibold
        shadow-md shadow-rose-300
        hover:bg-rose-600
        transition
      "
    >
      Logout
    </button>
  );
}

export default LogoutButton;