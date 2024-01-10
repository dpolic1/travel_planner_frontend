import React from 'react';
import { useState, useEffect } from 'react';
import "./LocationForm.css";
import useGlobalStore from '../../../../library/store/GlobalStore';

export default function LocationForm({ locationUID, parentDestinationUID, countryId, cities, specific_locations, onCountryChange, onDelete }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSpecificLocation, setSelectedSpecificLocation] = useState('');  
    
    const destinationRequests = useGlobalStore(state => state.destinationRequests);

    useEffect(() => {
        // Reset selected options when the country changes
        setSelectedCity('');
        setSelectedSpecificLocation('');
    }, [countryId]); // Only re-run the effect if countryId changes

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setSelectedSpecificLocation(''); // Reset the selected specific location when city changes
        updateSelectedLocationFields(parentDestinationUID, e.target.value, '');
    };

    const handleSpecificLocationChange = (e) => {
        setSelectedCity(''); // Reset the selected city when location changes
        setSelectedSpecificLocation(e.target.value);
        updateSelectedLocationFields(parentDestinationUID, '', e.target.value);
    };

    function updateSelectedLocationFields(parentDestinationUID, cityId, specificLocationId) {
        const destinationRequest = destinationRequests.find(destination => destination.destinationUID === parentDestinationUID);
        const locationRequest = destinationRequest.locations.find(location => location.locationUID === locationUID);
        locationRequest.cityId = cityId;
        locationRequest.specificLocationId = specificLocationId;
    }

    return (
        <section className="location_form" key={locationUID}>
            <div className="location_header">
                <div className="location_forms">
                    <select
                        id={`city-${locationUID}`}
                        value={selectedCity}
                        onChange={handleCityChange}
                    >
                        <option value="" disabled>Choose a city...</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    <select
                        id={`location-${locationUID}`}
                        value={selectedSpecificLocation}
                        onChange={handleSpecificLocationChange}
                    >
                        <option value="" disabled>Choose a location...</option>
                        {specific_locations.map((specific_location) => (
                            <option key={specific_location.id} value={specific_location.id}>
                                {specific_location.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="delete_location_button">
                    <button type="button" onClick={() => onDelete(locationUID)}>
                        Delete
                    </button>
                </div>
            </div>
        </section>
    );
}