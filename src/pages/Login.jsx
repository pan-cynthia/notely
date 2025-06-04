import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

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
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex: ^ = not, \s = whitespace char, @ = at symbol, combined = any char that is not a whitespace or at symbol
    return regex.test(email);
  }

  return (
    <>
      <NavBar/>
      <div className='flex justify-center items-center mt-30'>
        <div className="w-96 px-7 py-10 bg-white rounded-xl shadow-2xl">
          <form onSubmit={handleLogin}>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <div className="flex items-center justify-between w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none">
              <input className="flex-3/4 mr-2 outline-none" type={isShowPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"}/>
              {isShowPassword ? <FaRegEye className="text-blue-500 cursor-pointer" size={20} onClick={toggleShowPassword}/> : <FaRegEyeSlash className="text-blue-500 cursor-pointer" size={20} onClick={toggleShowPassword}/>}
            </div>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button className="w-full p-2 my-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">Login</button>
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
  )
}

export default Login
