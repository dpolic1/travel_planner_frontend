import React from 'react';
import "./LocationForm.css";

export default function LocationForm({index, country_locations, onDelete}) {
    const locationId = `location_${index}`;

    const handleDelete = () => {
        onDelete(index);
    }

    return (
        <section className="location_form" key={index}>
            <div className="form-group">
                <select className="form-control" 
                    id={locationId} 
                    defaultValue="" 
                    required>
                    <option value="" disabled>Choose a location...</option>
                    <option value="1">Location 1</option>
                    <option value="2">Location 2</option>
                    <option value="3">Location 3</option>
                    <option value="4">Location 4</option>
                    <option value="5">Location 5</option>
                </select>
                <button type="button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </section>
    );
}