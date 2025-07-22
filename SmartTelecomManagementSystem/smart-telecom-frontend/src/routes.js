import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
        <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login />} />
    
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/register" />} />
    </Routes>
  );
}
