import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    profilePic: null,
  });

  const { loading, signup } = useSignup();

  const handleFileChange = (e) => {
    setInputs({ ...inputs, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
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
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="input-modern h-12 sm:h-14 text-sm sm:text-base px-3 sm:px-4"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 sm:mb-3">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input-modern h-12 sm:h-14 text-sm sm:text-base px-3 sm:px-4"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="relative w-full">
            <div className="items-center justify-center max-w-xl mx-auto">
              <label
                className="flex justify-center w-full h-12 sm:h-14 px-4 sm:px-6 transition bg-white border-2 border-neutral-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-primary-400 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                id="drop"
              >
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <span className="font-medium text-neutral-600 text-sm sm:text-base">
                    Drop file for Profile or
                    <span className="text-primary-600 underline ml-1">
                      browse
                    </span>
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  accept="image/png,image/jpeg"
                  id="input"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-center my-4 sm:my-6">
            <Link
              to={"/login"}
              className="text-sm sm:text-base text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200"
            >
              Already have an account?
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
