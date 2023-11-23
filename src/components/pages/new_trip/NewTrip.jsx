import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/auth-context/AuthContext.js';

const NewTrip = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
        <div>
          <h1>Welcome to the New Trip Page!</h1>
          <h1>Welcome to the New Trip Page!</h1>
          <h1>Welcome to the New Trip Page!</h1>
          <h1>Welcome to the New Trip Page!</h1>
          <h1>Welcome to the New Trip Page!</h1>
          <h1>Welcome to the New Trip Page!</h1>
          <h1>Welcome to the New Trip Page!</h1>
        </div>
    </div>
  );
};

export default NewTrip;