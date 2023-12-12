import React from 'react';
import { useState } from 'react';
import "./DestinationForm.css";
import LocationForm from './LocationForm';

export default function DestinationForm({ countryUID , countries, onDelete}) {
  const [locations, setLocations] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const [cities, setCities] = useState([]);
  const [specific_locations, setSpecificLocations] = useState([]);

  const handleCountryChange = (event) => {
    if(locations.length === 0) {
      setLocations([...locations, { locationId: `location_${Date.now()}` }]);
    }
    setSelectedCountryId(event.target.value);
    fetchCountryCitiesAndLocations(event.target.value);
    
  };

  function fetchCountryCitiesAndLocations(countryId) {
    // Fetch cities
    fetch('http://localhost:8081/cities/country/' + countryId, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, 
          'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => setCities(data))
    .catch((error) => console.error('Error fetching cities:', error));

    // Fetch specific locations
    fetch('http://localhost:8081/specific_locations/country/' + countryId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, 
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => setSpecificLocations(data))
    .catch((error) => console.error('Error fetching specific locations:', error));
  }

  const handleAddLocation = () => {
    setLocations([...locations, { locationUID: `location_${Date.now()}` }]);
    console.log(cities);
  }

  const handleDeleteLocation = (locationUID) => {
    setLocations((locations) => locations.filter((location) => location.locationUID !== locationUID));
  };

  return (
    <section className="destination_form" key={countryUID}>
      <div className="destination_header">
        <div>
          <select className="form-control" 
            id={countryUID} 
            defaultValue="" 
            required
            onChange={handleCountryChange}>
            <option value="" disabled>Choose a country...</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="header_buttons">
          {selectedCountryId && (
            <div className="add_location">
              <button type="button" onClick={handleAddLocation}>+ New Location</button>
            </div>
          )}
          <button type="button" onClick={() => onDelete(countryUID)}>Delete</button>
        </div>
        
        
      </div>
      <div className="locations">
        {locations.map((location) => (
          <LocationForm 
            key={location.locationUID} 
            locationUID={location.locationUID}
            countryId={selectedCountryId}
            cities={cities}
            specific_locations={specific_locations}
            onCountryChange={handleCountryChange}
            onDelete={handleDeleteLocation}   
          />
        ))}
      </div>
    </section>
  );
}