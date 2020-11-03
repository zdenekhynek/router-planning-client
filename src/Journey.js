import React, { useState, useCallback } from "react";

import { getColorForIndex } from "./App";

import "./Journey.css";

export const cleanAddress = (address) => {
  return address.replace(", UK", "");
};

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
  const { index, date, start, end, arrival, departure, steps } = route;

  const startAddress = cleanAddress(start.address);
  const endAddress = cleanAddress(end.address);
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
        {date}, {departure} -> {arrival}
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

export const Stay = (route) => {
  const { index, stay, end } = route;
  const address = cleanAddress(end.address);
  const backgroundColor = getColorForIndex(index);

  return (
    <div className="stay">
      <span className="stay__circle" style={{ backgroundColor }} />
      <span className="stay__label">Stay in {address} for {stay}</span>
    </div>

  );
};

export default function Journey({ itinerary }) {
  if (!itinerary) {
    return null;
  }

  const itiLen = itinerary.length;

  return (
    <div className="journey">
      <h3>Your trip</h3>
      {itinerary.map((routes, i) => {
        const displayStay = i < itiLen - 1;

        if (routes.length) {
          return (
            <div>
              <Route index={i} {...routes[0]} />
              {displayStay && <Stay index={i} {...routes[0]} />}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
