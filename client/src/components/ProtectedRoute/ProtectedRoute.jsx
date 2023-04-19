import React from "react";
import { Redirect } from "react-router-dom";
import { useUserAuth } from "../../context/authContext";

export default function ProtectedRoute({ children }) {
  let user = useUserAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }

  return children;
}
