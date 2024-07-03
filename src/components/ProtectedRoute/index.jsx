import { useAuth } from "@context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("is", isAuthenticated);

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated]
  );

  return isAuthenticated ? children : null;
}
