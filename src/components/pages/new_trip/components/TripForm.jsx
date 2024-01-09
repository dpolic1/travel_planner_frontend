import { useState, useEffect } from 'react'
import DestinationForm from './DestinationForm'
import useGlobalStore from '../../../../library/store/GlobalStore'
import "./TripForm.css"

export default function TripForm() {
    const [destinations, setDestinations] = useState([])
    const [countries, setCountries] = useState([]);

    const destinationRequest = useGlobalStore(state => state.destinationRequests);
    const setDestinationRequest = useGlobalStore(state => state.setDestinationRequests);


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
        //todo
    }

    return (
        <form className="trip_form" onSubmit={handleSubmit}>
            <div className="form_top_elements">
                <input
                    type="text"
                    placeholder="Enter trip name"
                    required
                />

                <button type="button" onClick={handleAddDestination}>+ New Destination</button>
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
                    <label>Start date</label>
                    <input type="date" />
                </div>
                <div className="date_picker">
                    <label>End date</label>
                    <input type="date" />
                </div>

                <button type="submit">Create Trip</button>
            </div>
        </form>
    )
}
