import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="">
      {!loading ? (
        <button
          onClick={logout}
          className="p-2 rounded-lg text-neutral-600 hover:text-error-500 hover:bg-error-50 transition-all duration-200 hover:scale-105"
          title="Logout"
        >
          <BiLogOut className="h-5 w-5" />
        </button>
      ) : (
        <div className="w-9 h-9 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
