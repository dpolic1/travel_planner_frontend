import React from 'react';
import LocationDetails from './LocationDetails';

const DestinationDetails = ({ destination }) => (
  <div>
    <p>{destination.countryName}</p>
    <ul>
      {destination.locations.map((location, index) => (
        <li key={index}>
          <LocationDetails location={location} />
        </li>
      ))}
    </ul>
  </div>
);

export default DestinationDetails;