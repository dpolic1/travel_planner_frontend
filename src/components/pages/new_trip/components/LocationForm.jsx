import React from 'react';
import { useState } from 'react';
import "./LocationForm.css";

export default function LocationForm({ locationUID, country_locations, onDelete }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSpecificLocation, setSelectedSpecificLocation] = useState('');

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setSelectedSpecificLocation(''); // Reset the selected specific location when city changes
    };

    const handleSpecificLocationChange = (e) => {
        setSelectedSpecificLocation(e.target.value);
        setSelectedCity(''); // Reset the selected city when location changes
    };


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
                        <option value="1">City 1</option>
                        <option value="2">City 2</option>
                        <option value="3">City 3</option>
                        <option value="4">City 4</option>
                        <option value="5">City 5</option>
                    </select>
                    <select
                        id={`location-${locationUID}`}
                        value={selectedSpecificLocation}
                        onChange={handleSpecificLocationChange}
                    >
                        <option value="" disabled>Choose a location...</option>
                        <option value="1">Location 1</option>
                        <option value="2">Location 2</option>
                        <option value="3">Location 3</option>
                        <option value="4">Location 4</option>
                        <option value="5">Location 5</option>
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