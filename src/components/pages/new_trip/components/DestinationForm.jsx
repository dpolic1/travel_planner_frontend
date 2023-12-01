import React from 'react';
import { useState } from 'react';
import "./DestinationForm.css";
import LocationForm from './LocationForm';

export default function DestinationForm({ index , countries, onDelete}) {
  const countryId = `country_${index}`;
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
    console.log("adding location");
    setLocations([...locations, { locationId: `location_${locations.length}` }]);
  }

  const handleDelete = () => {
    onDelete(countryId);
  }

  const handleDeleteLocation = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  return (
    <section className="destination_form" key={index}>
      <div className="form-group">
        <div className="destination_header">
          <div>
            <select className="form-control" 
              id={countryId} 
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
            <button type="button" onClick={handleDelete}>Delete</button>
          </div>
          
          
        </div>
        <div className="locations">
          {locations.map((location, idx) => (
            <LocationForm 
              key={idx} 
              index={idx}
              locations={locations} 
              onDelete={handleDeleteLocation}   
            />
          ))}
        </div>
      </div>
    </section>
  );
}