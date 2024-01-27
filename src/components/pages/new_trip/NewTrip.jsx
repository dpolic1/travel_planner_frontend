import React, { useEffect } from 'react';
import './NewTrip.css';
import TripForm from './components/TripForm.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/auth-context/AuthContext.js';
import { useLocalization } from "../../../context/LocalizationContext";

const NewTrip = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLocalization();

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