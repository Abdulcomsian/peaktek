import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Immediately set isLoading to false when isAuthenticated is true
    if (isAuthenticated) {
      setIsLoading(false);
    } else {
      // Check localStorage for token (assuming it indicates authentication)
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoading(false);
        // Update isAuthenticated in context if necessary
        // setIsAuthenticated(true); // Uncomment if needed
      } else {
        setIsLoading(false); // Ensure isLoading is false to prevent flashing
        navigate("/"); // Navigate to login if no token found
      }
    }
  }, [isAuthenticated, navigate]);

  // Render loading indicator or null if still loading
  if (isLoading) {
    return null; // or render a loading spinner or message
  }

  // Render protected content if authenticated
  return isAuthenticated ? children : null;
}
