import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../hooks/useValidate';
import NavBar from '../components/NavBar';
import Password from '../components/Password';
import axiosInstance from '../api/axios';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    const errors = validatePassword(password);
    if (errors.length > 0) {
      setError(errors[0]);
      return;
    }
    setError("");

    // create account API call
    try {
      const response = await axiosInstance.post('/auth/create-account', {
        name: name,
        email: email,
        password: password
      })
      if (response.data && response.data.accessToken) { // successfully created account
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }
  
  return (
    <>
      <NavBar/>
      <div className="flex justify-center items-center mt-30">
        <div className="w-96 px-7 py-10 bg-white rounded-xl shadow-2xl">
          <form onSubmit={handleSignUp} noValidate>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
            <Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"}/>

            {error && <p className="text-red-500 text-xs pb-3">{error}</p>}

            <button className="w-full p-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer" type="submit">Create Account</button>
            <p className="text-center mt-4 text-sm font-medium">
              Already have an account?{" "}
              <Link className="text-blue-500 underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;
