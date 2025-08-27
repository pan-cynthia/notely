import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthGate from "./components/AuthGate";

import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { userInfo, isChecking } = useAuth();

  return (
    <Routes>
      {/* public routes */}
      <Route
        path="/login"
        element={
          isChecking ? null : userInfo ? (
            <Navigate to="/home" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isChecking ? null : userInfo ? (
            <Navigate to="/home" replace />
          ) : (
            <SignUp />
          )
        }
      />

      {/* protected routes */}
      <Route
        path="/home"
        element={
          <AuthGate>
            <Home />
          </AuthGate>
        }
      />

      {/* default route */}
      {/* if user is already logged in (userInfo not null) redirect to home page, otherwise redirect to login page*/}
      <Route
        path="/"
        element={
          isChecking ? null : userInfo ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
