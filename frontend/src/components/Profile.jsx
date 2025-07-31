import { useNavigate } from 'react-router-dom';
import { getUserInitials } from '../utils/stringUtils';

const Profile = ({userInfo}) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    userInfo && (
    <>
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center w-12 h-12 rounded-full font-me dium bg-slate-100">{getUserInitials(userInfo.name)}</div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium">{userInfo.name}</p>
          <button className="text-sm underline cursor-pointer" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
    )
  )
}

export default Profile;
