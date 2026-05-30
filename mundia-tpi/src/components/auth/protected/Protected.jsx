import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../auth.context";
import { isTokenValid } from "../auth.helpers";

const Protected = ({ children }) => {
  const { token } = useContext(AuthenticationContext);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
