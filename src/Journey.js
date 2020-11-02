import React, { useState, useCallback } from "react";

import { getColorForIndex } from "./App";

import "./Journey.css";

export const DistanceDuration = (data) => {
  const { distance, duration } = data;
  return (
    <div className="route__minor">
      {duration} &middot; {distance}
    </div>
  );
};

export const Step = (step) => {
  const { instructions } = step;

  return (
    <div className="step">
      <div>{instructions}</div>
      <DistanceDuration {...step} />
    </div>
  );
};

export const Route = (route) => {
  const [showDirections, setShowDirections] = useState(false);
  const { index, start, end, arrival, departure, steps } = route;

  const startAddress = start.address.replace(", UK", "");
  const endAddress = end.address.replace(", UK", "");
  const backgroundColor = getColorForIndex(index);

  const handleDirectionsClick = useCallback(
    (evt) => {
      evt.preventDefault();
      setShowDirections(!showDirections);
    },
    [showDirections]
  );
  const directionsLabel = showDirections ? "Hide details" : "See details";

  return (
    <div className="route">
      <span className="route__stripe" style={{ backgroundColor }} />
      <div className="route__major" style={{ color: backgroundColor }}>
        <span>{startAddress}</span>
        <span>{endAddress}</span>
      </div>
      <div className="route__minor">
        {departure} -> {arrival}
      </div>
      <DistanceDuration {...route} />
      <a href="#" className="route__directions" onClick={handleDirectionsClick}>
        {directionsLabel}
      </a>
      {showDirections && (
        <ul className="route__steps">
          <span
            className="route__steps__background"
            style={{ backgroundColor }}
          />
          {steps.map((step) => {
            return (
              <li>
                <Step {...step} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default function Journey({ itinerary }) {
  if (!itinerary) {
    return null;
  }

  return (
    <div className="journey">
      <h3>Your trip</h3>
      {itinerary.map((routes, i) => {
        if (routes.length) {
          return <Route index={i} {...routes[0]} />;
        }

        return null;
      })}
    </div>
  );
}
