import React from 'react';

export default function DestinationForm({ index }) {
    const countryId = `country_${index}`;
  
    return (
      <section>
        <form key={index}>
          <div className="form-group">
            <select className="form-control" id={countryId}>
              <option>Choose country...</option>
              <option>...</option>
            </select>
          </div>
        </form>
      </section>
    );
  }