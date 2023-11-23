import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/auth-context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Render the welcome message and other content when authenticated
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <h1>Welcome to the Home Page!</h1>
      <h1>Welcome to the Home Page!</h1>
      <h1>Welcome to the Home Page!</h1>
      {/* Other home content */}
    </div>
  );
};

export default Home;