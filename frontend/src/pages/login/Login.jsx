import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center justify-center min-h-screen px-4 py-8 surface-secondary">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg surface-primary border border-neutral-200">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-primary mb-6 sm:mb-8 font-display tracking-tight">
          ZenChat
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 sm:mb-3">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input-modern h-12 sm:h-14 text-sm sm:text-base px-3 sm:px-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 sm:mb-3">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input-modern h-12 sm:h-14 text-sm sm:text-base px-3 sm:px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center my-4 sm:my-6">
            <Link
              to="/signup"
              className="text-sm sm:text-base text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200"
            >
              Don't have an account? Sign up
            </Link>
          </div>
          <div>
            <button
              className="btn-primary w-full h-12 sm:h-14 text-sm sm:text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
