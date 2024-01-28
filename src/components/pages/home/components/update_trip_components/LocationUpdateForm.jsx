import React from 'react';
import { useEffect, useState } from 'react';
import {useLocalization} from "../../../../../context/LocalizationContext";

import useGlobalStore from "../../../../../library/store/GlobalStore";

const LocationUpdateForm = ({parentDestinationID, countryId, currentLocation, cities, specific_locations, resetToDefault}) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCityId, setSelectedCityId] = useState(currentLocation.cityId);
    const [selectedSpecificLocation, setSelectedSpecificLocation] = useState('');
    const [selectedSpecificLocationId, setSelectedSpecificLocationId] = useState(currentLocation.specificLocationId);  

    const { t, language, setLanguage } = useLocalization();

    const updateDestinationRequests = useGlobalStore(state => state.updateDestinationRequests);
    const setUpdateDestinationRequests = useGlobalStore(state => state.setUpdateDestinationRequests);

    useEffect(() => {
        // Reset selected options when the country changes
        setSelectedCityId(selectedCityId || "");
        setSelectedSpecificLocationId(selectedSpecificLocationId || "");

        if(resetToDefault){
            setSelectedCityId("");
            setSelectedSpecificLocationId("");
        }

    }, [countryId, resetToDefault]); // Only re-run the effect if countryId changes

    const onCountryChange = () => {
        setSelectedCityId(null);
        setSelectedSpecificLocationId(null);
    }

    const handleCityChange = (e) => {
        setSelectedCityId(e.target.value);
        setSelectedSpecificLocationId(""); // Reset the selected specific location when city changes
        updateFields(parentDestinationID, e.target.value, null);
    };

    const handleSpecificLocationChange = (e) => {
        setSelectedCityId(""); // Reset the selected city when location changes
        setSelectedSpecificLocationId(e.target.value);
        updateFields(parentDestinationID, null, e.target.value);
    };

    function updateFields(parentDestinationID, cityId2, specificLocationId2){
        const updateDestinationRequest = updateDestinationRequests.find(destination => destination.id === parentDestinationID);
        const updateLocationRequest = updateDestinationRequest.locations.find(location => location.id === currentLocation.id);
        updateLocationRequest.cityId = parseInt(cityId2);
        updateLocationRequest.specificLocationId = parseInt(specificLocationId2);
    }

    return (
        <section className="location_form" key={currentLocation.id}>
            <div className="location_header">
                <div className="location_forms">
                    <select
                        id={`city-${currentLocation.id}`}
                        value={selectedCityId}
                        onChange={handleCityChange}
                    >
                        <option value="" disabled>{t("choose_city")}</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id} selected={city.id === selectedCityId}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    <select
                        id={`location-${currentLocation.id}`}
                        value={selectedSpecificLocationId}
                        onChange={handleSpecificLocationChange}
                    >
                        <option value="" disabled>{t("choose_specific_location")}</option>
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