import { useState } from "react";

import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
