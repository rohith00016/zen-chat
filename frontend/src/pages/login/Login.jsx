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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          <span className="text-[#0dba4b]"> ZenChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-blue">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-12"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-blue">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center my-2">
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-800 mt-2 inline-block"
            >
              {"Don't"} have an account? Signup
            </Link>
          </div>
          <div>
            <button
              className="btn bg-[#0dba4b]  btn-block btn-md mt-2 text-white hover:bg-transparent hover:btn-success"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "SIGN IN"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
