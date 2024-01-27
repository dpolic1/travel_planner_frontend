import React from 'react';
import {useLocalization} from "../../../../../context/LocalizationContext";


const LocationDetails = ({ location }) => {
  const { t, language, setLanguage } = useLocalization();

  return (
    <div>
      <p>
        {location.specificLocationName && (
          <span>{t("specific_location")} {location.specificLocationName}</span>
        )}
        {location.cityName && (
          <span>{t("city")} {location.cityName}</span>
        )}
      </p>
    </div>
  )
  
};

export default LocationDetails;