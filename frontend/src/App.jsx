import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthGate from "./components/AuthGate";

const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* protected routes */}
      <Route
        path="/home"
        element={
          <AuthGate>
            <Home />
          </AuthGate>
        }
      />

      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;
