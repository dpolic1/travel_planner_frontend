import React from 'react';
import { useState } from 'react';
import "./DestinationForm.css";
import LocationForm from './LocationForm';

export default function DestinationForm({ countryUID , countries, onDelete}) {
  const [locations, setLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryChange = (event) => {
    console.log('Selected Country');
    if(locations.length === 0) {
      setLocations([...locations, { locationId: `location_${locations.length}` }]);
    }
    setSelectedCountry(event.target.value);
  };

  const handleAddLocation = () => {
    setLocations([...locations, { locationUID: `location_${Date.now()}` }]);
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
          {selectedCountry && (
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
            locations={locations} 
            onDelete={handleDeleteLocation}   
          />
        ))}
      </div>
    </section>
  );
}