import React, { useEffect } from 'react';
import './NewTrip.css';
import TripForm from './components/TripForm.jsx';
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
            <TripForm />
        </div>
    </div>
  );
};

export default NewTrip;