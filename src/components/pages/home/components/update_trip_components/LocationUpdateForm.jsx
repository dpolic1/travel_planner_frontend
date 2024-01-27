import React from 'react';
import { useEffect, useState } from 'react';

const LocationUpdateForm = ({parentDestinationID, countryId, location, cities, specific_locations, onCountryChange}) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCityId, setSelectedCityId] = useState(location.cityId);
    const [selectedSpecificLocation, setSelectedSpecificLocation] = useState('');
    const [selectedSpecificLocationId, setSelectedSpecificLocationId] = useState(location.specificLocationId);  

    console.log(selectedCityId);
    console.log(selectedSpecificLocationId);

    useEffect(() => {
        // Reset selected options when the country changes
        setSelectedCityId(selectedCityId || "");
        setSelectedSpecificLocationId(selectedSpecificLocationId || "");
    }, [countryId]); // Only re-run the effect if countryId changes

    const handleCityChange = (e) => {
        setSelectedCityId(e.target.value);
        setSelectedSpecificLocationId(""); // Reset the selected specific location when city changes
    };

    const handleSpecificLocationChange = (e) => {
        setSelectedCityId(""); // Reset the selected city when location changes
        setSelectedSpecificLocationId(e.target.value);
    };

    return (
        <section className="location_form" key={location.id}>
            <div className="location_header">
                <div className="location_forms">
                    <select
                        id={`city-${location.id}`}
                        value={selectedCityId}
                        onChange={handleCityChange}
                    >
                        <option value="" disabled>Choose a city...</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id} selected={city.id === selectedCityId}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    <select
                        id={`location-${location.id}`}
                        value={selectedSpecificLocationId}
                        onChange={handleSpecificLocationChange}
                    >
                        <option value="" disabled>Choose a location...</option>
                        {specific_locations.map((specific_location) => (
                            <option key={specific_location.id} value={specific_location.id} selected={specific_location.id === selectedSpecificLocationId}>
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