import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../hooks/useValidate';
import NavBar from '../components/NavBar';
import Password from '../components/Password';
import axiosInstance from '../api/axios.js';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

    // login API call
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: email,
        password: password
      });
      // successfully logged in
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate('/'); // navigate to home page
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
      <div className='flex justify-center items-center mt-30'>
        <div className="w-96 px-7 py-10 bg-white rounded-xl shadow-2xl">
          <form onSubmit={handleLogin} noValidate>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"}/>

            {error && <p className="text-red-500 text-xs pb-3">{error}</p>}

            <button className="w-full p-2 my-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer" type="submit">Login</button>
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

export default Login;
