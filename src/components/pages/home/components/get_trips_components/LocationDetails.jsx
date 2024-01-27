import React from 'react';

const LocationDetails = ({ location }) => (
  <div>
    <p>
      {location.specificLocationName && (
        <span>Specific Location: {location.specificLocationName}</span>
      )}
      {location.cityName && (
        <span>City: {location.cityName}</span>
      )}
    </p>
  </div>
);

export default LocationDetails;