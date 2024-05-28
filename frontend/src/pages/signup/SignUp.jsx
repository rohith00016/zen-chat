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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          <span className="text-[#0dba4b]">ZenChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full input input-bordered h-12"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-12"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-12"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div class="relative w-full mt-4">
            <div class="items-center justify-center max-w-xl mx-auto">
              <label
                class="flex justify-center w-full h-12 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                id="drop"
              >
                <span class="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <span class="font-medium text-gray-600">
                    Drop file for Profile or
                    <span class="text-blue-600 underline ml-[4px]">browse</span>
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  class="hidden"
                  accept="image/png,image/jpeg"
                  id="input"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-center my-1">
            <Link
              to={"/login"}
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
              href="#"
            >
              Already have an account?
            </Link>
          </div>

          <div>
            <button
              className="btn btn-block btn-md mt-2 bg-[#0dba4b] text-white hover:btn-success hover:bg-transparent"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "SIGN UP"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
