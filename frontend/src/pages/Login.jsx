import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUser, login } from "../api/auth";

import { validateEmail } from "../utils/stringUtils";

import NavBar from "../components/NavBar";
import Password from "../components/Password";

import { useAuth } from "../hooks/useAuth";

import { handleError } from "../utils/handleError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUserInfo } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setError("");

    try {
      const response = await login({ email, password });
      const accessToken = response.data.accessToken;
      const refreshTokenExp = response.data.refreshTokenExp;

      if (accessToken && refreshTokenExp) {
        // successful login
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshTokenExp", refreshTokenExp);
        try {
          const res = await getUser();
          setUserInfo(res.data.user);
        } catch (error) {
          handleError(error);
        }
        navigate("/home");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-30">
        <div className="w-96 px-7 py-10 bg-white rounded-xl shadow-2xl">
          <form onSubmit={handleLogin} noValidate>
            <input
              className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
            />

            {error && <p className="text-red-500 text-xs pb-3">{error}</p>}

            <button
              className="w-full p-2 my-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
              type="submit"
            >
              Login
            </button>
            <p className="text-center mt-4 text-sm font-medium">
              Not registered yet?{" "}
              <Link className="text-blue-500 underline" to="/signup">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
