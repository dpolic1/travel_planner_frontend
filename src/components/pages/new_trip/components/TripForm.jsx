import { useState } from 'react'
import DestinationForm from './DestinationForm'
import "./TripForm.css"

export default function TripForm() {
    const [formData, setFormData] = useState({})
    const [destinations, setDestinations] = useState([])

    const handleAddDestination = () => {
        console.log("adding destination");
        setDestinations([...destinations, {name: '', location: '', description: ''}])
    }

    const handleAddLocation = () => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="form_top_elements">
                <input
                    type="text"
                    placeholder="Enter trip name"
                    required 
                />

                <button type="button" onClick={handleAddDestination}>+ New Destination</button>
            </div>

            <div>
                {destinations.map((destination, idx) => (
                    <DestinationForm key={idx} index={idx}/>
                ))}
            </div>
        </form>

    )
}
