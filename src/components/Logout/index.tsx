import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red
    -600
    cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
