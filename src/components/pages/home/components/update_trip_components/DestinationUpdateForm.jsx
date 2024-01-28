import React, { useEffect, useState } from "react";
import LocationUpdateForm from "./LocationUpdateForm";
import useGlobalStore from "../../../../../library/store/GlobalStore";

const DestinationUpdateForm = ({currentDestination, countries, countryId, locations}) => {
  const [selectedCountryId, setSelectedCountryId] = useState(countryId);

  const [cities, setCities] = useState([]);
  const [specific_locations, setSpecificLocations] = useState([]);

  const [resetOptions, setResetOptions] = useState(false);

  const updateDestinationRequests = useGlobalStore(state => state.updateDestinationRequests);

  const handleCountryChange = (event) => {
    setSelectedCountryId(event.target.value);
    fetchCountryCitiesAndLocations(event.target.value);
    const updateDestinationRequest = updateDestinationRequests.find(destination => destination.id === currentDestination.id);
    updateDestinationRequest.countryId = event.target.value;

    setResetOptions(true);
  };

    useEffect(() => {
      if(specific_locations.length === 0 || cities.length === 0){
        fetchCountryCitiesAndLocations(countryId);
      }
    });

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

  return (
    <section className="destination_form" key={currentDestination.id}>
      <div className="destination_header">
        <div>
          <select className="form-control" 
            value={selectedCountryId}
            required
            onChange={handleCountryChange}>
            {countries.map((country) => (
              <option key={country.id} value={country.id} selected={country.id === selectedCountryId}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {<div className="locations">
        {locations.map((location) => (
          <LocationUpdateForm
            parentDestinationID={currentDestination.id}
            countryId={selectedCountryId}
            currentLocation={location}
            cities={cities}
            specific_locations={specific_locations}
            onCountryChange={handleCountryChange}
            resetToDefault={resetOptions}
          />
        ))}
      </div>}
    </section>
  );

};

export default DestinationUpdateForm;