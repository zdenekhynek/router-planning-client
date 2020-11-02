import React, { useCallback, useState, useEffect } from "react";
import "./App.css";

import Map from "./Map.js";
import Form from "./Form.js";
import Journey from "./Journey.js";
import fetchJourney from "./fetch_journey";

export const COLOR_SCHEME = [
  "#B83E1C",
  "#0CB1EB",
  "#ED8447",
  "#3E4D85",
  "#1C3DB8",
];

export const getColorForIndex = (index) => {
  const normIndex = index % COLOR_SCHEME.length;
  return COLOR_SCHEME[normIndex];
};

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = useCallback((formData) => {
    setFormData(formData);
  }, []);

  const getJourney = async (region, dates, types) => {
    setIsLoading(true);
    const results = await fetchJourney(region, dates, types);
    setItinerary(results.itinerary);
    setIsLoading(false);
  };

  useEffect(() => {
    if (formData) {
      getJourney(formData.region, formData.dates, formData.types);
    }
  }, [formData]);

  const mapProps = {
    itinerary,
    markers: [],
    midpoint: null,
    polylines: null,
    callbacks: {},
  };

  return (
    <div className="app">
      <div className="app__header" />
      <div className="app__content">
        <div className="app__col">
          <Form onSubmit={handleFormSubmit} isLoading={isLoading} />
          <Journey itinerary={itinerary} />
        </div>
        <div className="app__col">
          <Map
            {...mapProps}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
