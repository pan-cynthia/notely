import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useState } from 'react'

const Password = ({value, onChange, placeholder}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
     <div className="flex items-center justify-between w-full px-5 py-3 mb-4 text-sm rounded shadow outline-none">
        <input className="flex-3/4 mr-2 outline-none" type={isShowPassword ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder || "Password"}/>
        {isShowPassword ? <FaRegEye className="text-blue-500 cursor-pointer" size={20} onClick={toggleShowPassword}/> : <FaRegEyeSlash className="text-blue-500 cursor-pointer" size={20} onClick={toggleShowPassword}/>}
      </div>
  )
}

export default Password