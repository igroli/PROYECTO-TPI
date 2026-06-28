import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../auth.context";
import { isTokenValid } from "../auth.helpers";

const Protected = ({ children, allowedRoles }) => {
  const { token, user } = useContext(AuthenticationContext);
  
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children;
};

export default Protected;
