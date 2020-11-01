import React, { useState, useEffect } from "react";
import "./App.css";

import Map from "./Map.js";
import fetchJourney from "./fetch_journey";

export const createMarkerFromLatLng = (latLng) => {
  return { lat: latLng.lat(), lng: latLng.lng() };
};

export const parseLegLineToArray = (line) => {
  return line ? JSON.parse(line) : [];
};

export const concatLegs = (legs) => {
  return legs.reduce((acc, leg) => {
    return acc.concat(leg.coords);
  }, []);
};

function App() {
  const [markers, setMarkers] = useState([
    { lat: 51.5, lng: -0.1 },
    { lat: 51.55, lng: -0.1 },
  ]);
  const [midpoint, setMidpoint] = useState(null);
  const [polylines, setPolylines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateJourney = async () => {
    // if (markers.length > 1) {
    //   //  clear results before the new results are fetched
    //   setMidpoint(null);
    //   setPolylines([]);
    //   setIsLoading(true);

    //   const results = await fetchJourney(markers.slice(0, 2));

    //   if (results) {
    //     const { midpoint } = results;
    //     if (midpoint) {
    //       setMidpoint({ lat: midpoint[0], lng: midpoint[1] });
    //     }

    //     const { journeys } = results;
    //     if (journeys) {
    //       const journeyPolylines = journeys.map((journey) => {
    //         if (!journey) {
    //           return [];
    //         }

    //         const { legs } = journey;
    //         return legs ? concatLegs(legs) : [];
    //       });
    //       setPolylines(journeyPolylines);
    //       setIsLoading(false);
    //     }
    //   } else {
    //     //  something went wrong
    //     setPolylines([]);
    //     setMidpoint(null);
    //     setIsLoading(false);
    //   }
    // }
  };

  useEffect(() => {
    updateJourney();
  }, [markers]);

  const mapProps = {
    markers: [],
    midpoint: null,
    polylines: null,
    callbacks: {}
  };

  return (
    <div className="App">
      <Map
        {...mapProps}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {isLoading && <div className="loader">Calculating journeys...</div>}
    </div>
  );
}

export default App;
