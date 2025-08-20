import { useNavigate } from "react-router-dom";

import { logout } from "../api/auth";

import { getUserInitials } from "../utils/stringUtils";

import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAuth();

  const handleLogout = async () => {
    await logout(navigate, setUserInfo);
  };

  return (
    userInfo && (
      <>
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center w-12 h-12 rounded-full font-me dium bg-slate-100">
            {getUserInitials(userInfo.name)}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <button
              className="text-sm underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
