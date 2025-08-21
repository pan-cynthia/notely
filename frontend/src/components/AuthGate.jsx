import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Auth = ({ children }) => {
  const { userInfo, isChecking } = useAuth();

  if (isChecking) {
    return <div style={{ color: "red" }}>Checking authentication...</div>;
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Auth;
