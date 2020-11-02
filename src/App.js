import React, { useCallback, useState, useEffect } from "react";
import "./App.css";

import Map from "./Map.js";
import Form from "./Form.js";
import Journey from "./Journey.js";
import fetchJourney from "./fetch_journey";

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = useCallback((formData) => {
    setFormData(formData);
  }, []);

  const getJourney = async (region, dates, types) => {
    const results = await fetchJourney(region, dates, types);
    setItinerary(results.itinerary);
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
    <div className="App">
      <div className="App__col">
        <Form onSubmit={handleFormSubmit} />
        <Journey itinerary={itinerary} />
      </div>
      <div className="App__col">
        <Map
          {...mapProps}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default App;
