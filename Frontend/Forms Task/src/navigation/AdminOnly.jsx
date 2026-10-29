import { Navigate } from "react-router-dom";

function AdminOnly({ children }) {
  return sessionStorage.getItem("authToken") &&
    sessionStorage.getItem("userAccess") === "admin"
    ? children
    : <Navigate to="/admin/login" replace />;
}

export default AdminOnly;
