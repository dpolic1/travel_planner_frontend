import { useState, useEffect } from 'react'
import DestinationForm from './DestinationForm'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '../../../../library/store/GlobalStore'
import "./TripForm.css"
import { useLocalization } from "../../../../context/LocalizationContext";

export default function TripForm() {
    const navigate = useNavigate();

    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [destinations, setDestinations] = useState([])
    const [countries, setCountries] = useState([]);

    const destinationRequest = useGlobalStore(state => state.destinationRequests);
    const setDestinationRequest = useGlobalStore(state => state.setDestinationRequests);

    const { t, language, setLanguage } = useLocalization();

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

    const handleAddDestination = () => {
        const destination = { destinationUID: Date.now() }
        setDestinations([...destinations, destination]);
        setDestinationRequest([...destinationRequest, destination])
    }

    const handleDeleteDestination = (destinationUID) => {
        console.log("deleting destination with index: " + destinationUID);
        setDestinations((destinations) => destinations.filter((destination) => destination.destinationUID !== destinationUID));
        setDestinationRequest((destinationRequest) => destinationRequest.filter((destination) => destination.destinationUID !== destinationUID));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(tripName);
        console.log(startDate);
        console.log(endDate);

        try {
            const response = await fetch('http://localhost:8081/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
                body: JSON.stringify({
                    name: tripName,
                    startDate: startDate,
                    endDate: endDate,
                    destinationRequests: destinationRequest.map((destination) => ({
                        countryId: destination.countryId,
                        locationRequests: destination.locations.map((location) => ({
                            name: location.name,
                            cityId: location.cityId,
                            specificLocationId: location.specificLocationId
                        })),
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            window.alert("Trip created successfully!");
            navigate('/');
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <form className="trip_form" onSubmit={handleSubmit}>
            <div className="form_top_elements">
                <input
                    type="text"
                    placeholder={t("trip_name")}
                    required
                    value={tripName}
                    onChange={handleTripNameChange}
                />

                <button type="button" onClick={handleAddDestination}>{t("new_destination")}</button>
            </div>
            <div className="destinations">
                {destinations.map((destination) => (
                    <DestinationForm
                        key={destination.destinationUID}
                        destinationUID={destination.destinationUID}
                        countries={countries}
                        onDelete={handleDeleteDestination}
                    />
                ))}
            </div>

            <div className="form_bottom_elements">
                <div className="date_picker">
                    <label>{t("start_date")}</label>
                    <input 
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange} 
                    />
                </div>
                <div className="date_picker">
                    <label>{t("end_date")}</label>
                    <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange} 
                    />
                </div>

                <button type="submit">{t("create_trip")}</button>
            </div>
        </form>
    )
}
