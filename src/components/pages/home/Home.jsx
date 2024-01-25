import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/auth-context/AuthContext";
import TripDetails from "./components/get_trips_components/TripDetails";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetch('http://localhost:8081/trips/my-trips', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching trips:', error));
    }
  }, [isAuthenticated, navigate]);

  // Render the welcome message and other content when authenticated
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <h1>Welcome to the Home Page!</h1>
      {trips.map((trip) => (
        <TripDetails key={trip.id} trip={trip} />
    ))}
    </div>
  );
};

export default Home;