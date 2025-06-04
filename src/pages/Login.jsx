import React from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <NavBar/>
      <div className='flex justify-center items-center mt-30'>
        <div className="w-96 px-7 py-10 bg-white rounded-xl shadow-2xl">
          <form onSubmit={() => {}}>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="email" placeholder="Email"/>
            <div className="flex items-center justify-between w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none">
              <input className="flex-3/4 mr-2 outline-none" type="password" placeholder="Password"/>
            </div>
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
