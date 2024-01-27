import React from 'react';
import DestinationDetails from './DestinationDetails';
import './TripDetails.css';
import { Pen, Trash } from 'lucide-react';

const TripDetails = ({ trip, onDelete, onEdit }) => {
  const handleEditClick = (tripId) => {
    onEdit(tripId);
  };
  
  const handleDeleteClick = (tripId) => {
    onDelete(tripId);
  };

  return (
    <div className="trip_items">
      <div className="trip_header">
        <div className="header_one">
          <p className="trip_name">{trip.name}</p>
          <div className="header_buttons">
            <button 
              className="edit_trip_button"
              onClick={() => handleEditClick(trip.id)}
            ><Pen size={20} />
            </button>
            <button
              className="delete_trip_button"
              onClick={() => handleDeleteClick(trip.id)}
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
        <div className="header_two">
          <p><strong>Start Date:</strong> {trip.startDate}</p>
          <p><strong>End Date:</strong> {trip.endDate}</p>
        </div>
      </div>
      <ul>
        {trip.destinations.map((destination, index) => (
          <li key={index}>
            <DestinationDetails destination={destination} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripDetails;