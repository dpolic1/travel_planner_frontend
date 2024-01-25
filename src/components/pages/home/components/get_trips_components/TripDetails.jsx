import React from 'react';

const TripDetails = ({ trip }) => (
  <div>
    <h3>{trip.name}</h3>
    <p>Start Date: {trip.startDate}</p>
    <p>End Date: {trip.endDate}</p>
  </div>
);

export default TripDetails;