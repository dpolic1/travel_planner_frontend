import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/auth-context/AuthContext";
import TripDetails from "./components/get_trips_components/TripDetails";
import "./Home.css";
import TripUpdateForm from "./components/update_trip_components/TripUpdateForm";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [tripToUpdate, setTripToUpdate] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    } 
    else {
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

  const handleEditTrip = (tripId) => {
    const trip = trips.find((trip) => trip.id === tripId);
    setTripToUpdate(trip);
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      const response = await fetch(`http://localhost:8081/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // If the DELETE request is successful, update the list of trips
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      } else {
        console.error('Failed to delete trip:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const reloadTrips = () => {
    console.log("updating")
    setTrips([]);
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
    })
    .catch((error) => console.error('Error fetching trips:', error));
  }

  // Render the welcome message and other content when authenticated
  return (
    <div className="home_page_items">
      <div className="user_trips">
        <div className="user_trip">
          {trips.map((trip) => (
            <TripDetails key={trip.id} trip={trip} onDelete={handleDeleteTrip} onEdit={handleEditTrip}/>
          ))}
        </div>
      </div>
      <div className="edit_trip_form">
        {
          tripToUpdate && <TripUpdateForm key={tripToUpdate.id} tripData={tripToUpdate} setTripToUpdate={setTripToUpdate} reloadTrips={reloadTrips}/>
        }
      </div>
    </div>
  );
};

export default Home;