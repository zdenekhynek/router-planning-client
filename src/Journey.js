import React from "react";

export const DistanceDuration = (data) => {
  const { distance, duration } = data;
  return <div>{distance}/{duration}</div>;
}

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
  const { start, end, arrival, departure, steps } = route;

  return (
    <div>
      <div>
        From: {start.address} at {departure}
      </div>
      <div>
        To: {end.address} at {arrival}
      </div>
      <DistanceDuration {...route} />
      <ul>
        {steps.map((step) => {
          return (
            <li>
              <Step {...step} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default function Journey({ itinerary }) {
  if (!itinerary) {
    return null;
  }

  return (
    <div>
      {itinerary.map((routes) => {
        if (routes.length) {
          return <Route {...routes[0]} />;
        }

        return null;
      })}
    </div>
  );
}
