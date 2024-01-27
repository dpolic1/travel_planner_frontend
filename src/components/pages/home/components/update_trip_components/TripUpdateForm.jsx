import React, { useEffect } from "react";
import { useState } from "react";
import DestinationUpdateForm from "./DestinationUpdateForm";
import "./TripUpdateForm.css";
import { X } from "lucide-react";

const TripUpdateForm = ({ tripData, setTripToUpdate }) => {
    const [tripName, setTripName] = useState(tripData?.name);
    const [startDate, setStartDate] = useState(tripData?.startDate);
    const [endDate, setEndDate] = useState(tripData?.endDate);
    const [countries, setCountries] = useState([]);

    console.log(tripData);

    useEffect(() => {
        fetch('http://localhost:8081/countries/simple', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    const handleTripNameChange = (e) => {
        setTripName(e.target.value);
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/trips/${tripData.tripId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
                body: JSON.stringify({
                    name: tripName,
                    startDate: startDate,
                    endDate: endDate,
                    /* destinationRequests: destinationRequest.map((destination) => ({
                        countryId: destination.countryId,
                        locationRequests: destination.locations.map((location) => ({
                            name: location.name,
                            cityId: location.cityId,
                            specificLocationId: location.specificLocationId
                        })),
                    })), */
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            alert("Trip created successfully");
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    }
    return (
        <form className="update_trip_form" onSubmit={handleSubmit}>
            <div className="update_form_top_elements">
                <input
                    type="text"
                    placeholder="Enter trip name"
                    required
                    value={tripName}
                    onChange={handleTripNameChange}
                />
                <button type="button" onClick={() => setTripToUpdate(null)}><X size={20}/></button>
            </div>
            <div className="update_destinations">
                {tripData?.destinations.map((destination) => (
                    <DestinationUpdateForm
                        key={destination.id}
                        destination={destination}
                        countries={countries}
                        countryId={destination.countryId}
                        locations={destination.locations}
                    />
                ))}
            </div>

            <div className="update_form_bottom_elements">
                <div className="update_date_picker">
                    <label>Start date</label>
                    <input 
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange} 
                    />
                </div>
                <div className="update_date_picker">
                    <label>End date</label>
                    <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange} 
                    />
                </div>

                <button type="submit">Update Trip</button>
            </div>
        </form>
    )
}

export default TripUpdateForm;