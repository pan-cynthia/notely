import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../api/auth";

import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { autoLogout } from "../utils/authentication";

const Auth = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const { setUserInfo } = useAuth();
  const { handleShowToast } = useToast();

  // check if user is logged in before rendering Home.jsx
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUser();
        if (response.data.user) {
          setUserInfo(response.data.user);
          setIsAuthenticated(true);

          const refreshTokenExp = Number(
            localStorage.getItem("refreshTokenExp")
          );
          autoLogout(handleShowToast, refreshTokenExp);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [handleShowToast, setUserInfo]);

  if (isChecking) {
    return <div style={{ color: "red" }}>Checking authentication...</div>;
  }

  return isAuthenticated ? navigate("/home") : navigate("/login");
};

export default Auth;
