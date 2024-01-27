import React from 'react';
import { useEffect, useState } from 'react';

const LocationUpdateForm = ({parentDestinationID, countryId, location, cities, specific_locations, onCountryChange}) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSpecificLocation, setSelectedSpecificLocation] = useState('');  

    useEffect(() => {
        // Reset selected options when the country changes
        setSelectedCity('');
        setSelectedSpecificLocation('');
    }, [countryId]); // Only re-run the effect if countryId changes

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setSelectedSpecificLocation(''); // Reset the selected specific location when city changes
    };

    const handleSpecificLocationChange = (e) => {
        setSelectedCity(''); // Reset the selected city when location changes
        setSelectedSpecificLocation(e.target.value);
    };

    return (
        <section className="location_form" key={location.id}>
            <div className="location_header">
                <div className="location_forms">
                    <select
                        id={`city-${location.id}`}
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
                        id={`location-${location.id}`}
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
            </div>
        </section>
    );
};

export default LocationUpdateForm;