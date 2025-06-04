import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Password from '../components/Password'

const SignUp = () => {
  return (
    <>
      <NavBar/>
      <div className="flex justify-center items-center mt-30">
        <div className="w-96 px-7 py-10 bg-white rounded-xl shadow-2xl">
          <form>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="text" placeholder="Name"></input>
            <input className="w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none" type="email" placeholder="Email"></input>
            <Password placeholder={"Password"}/>
            <button className="w-full p-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">Create Account</button>
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

export default SignUp