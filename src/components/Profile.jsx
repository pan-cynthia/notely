import { getInitials } from "../hooks/useValidate"

const Profile = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center w-12 h-12 rounded-full font-medium bg-slate-100">{getInitials("Test User")}</div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium">Test User</p>
          <button className="text-sm underline cursor-pointer">Logout</button>
        </div>
      </div>
    </>
  )
}

export default Profile