import React from "react";

import { getColorForIndex } from "./App";

import "./Journey.css";

export const DistanceDuration = (data) => {
  const { distance, duration } = data;
  return (
    <div className="route__minor">
      {duration} * {distance}
    </div>
  );
};

export const Step = (step) => {
  const { instructions } = step;

  return (
    <div>
      <DistanceDuration {...step} />
      <div>{instructions}</div>
    </div>
  );
};

export const Route = (route) => {
  const { index, start, end, arrival, departure, steps } = route;

  const startAddress = start.address.replace(", UK", "");
  const endAddress = end.address.replace(", UK", "");
  const backgroundColor = getColorForIndex(index);

  return (
    <div className="route">
      <span className="route__stripe" style={{ backgroundColor }} />
      <div className="route__major">
        <span>{startAddress}</span>
        <span>{endAddress}</span>
      </div>
      <div className="route__minor"> 
        {departure} -> {arrival}
      </div>
      <DistanceDuration {...route} />
      {/* <ul>
        {steps.map((step) => {
          return (
            <li>
              <Step {...step} />
            </li>
          );
        })}
      </ul> */}
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
