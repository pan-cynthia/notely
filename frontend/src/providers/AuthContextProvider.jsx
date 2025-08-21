import { useCallback, useEffect, useState } from "react";

import { getUser } from "../api/auth";

import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsChecking(true);
    // set userInfo for protected routes
    try {
      const response = await getUser();
      if (response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch {
      setUserInfo(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    // don't call checkAuth on public routes
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      checkAuth();
    } else {
      setIsChecking(false);
    }
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ checkAuth, isChecking, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
