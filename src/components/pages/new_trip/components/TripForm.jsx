import { useState } from 'react'
import DestinationForm2 from './DestinationForm2'

export default function TripForm() {
    const [formData, setFormData] = useState({})
    const [destinations, setDestinations] = useState([])

    const handleAddDestination = () => {
        setDestinations([...destinations, {name: '', location: '', description: ''}])
    }

    const handleAddLocation = () => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <input
                    type="text"
                    placeholder="Enter trip name"
                    required />
                </label>

                <button type="button" onClick={handleAddDestination}>New Destination</button>
            </div>

            <div>
                {destinations.map((destination, idx) => {
                    <DestinationForm2 />
                })}
            </div>
        </form>

    )
}
