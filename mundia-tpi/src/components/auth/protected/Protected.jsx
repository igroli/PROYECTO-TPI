import React from "react";
import { Navigate } from "react-router";

const Protected = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
