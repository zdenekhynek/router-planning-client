import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

export const convertArrayToLatLng = (arr) => {
  return arr.map(([lat, lng]) => ({ lat, lng }));
};

export const Map = ({
  markers = [],
  midpoint = null,
  polylines = [],
  callbacks = {},
}) => {
  const [shouldPosition, setShouldPosition] = useState(true);

  useEffect(() => {
    setTimeout(() => setShouldPosition(false), 2000);
  }, []);

  const mapProps = {
    mapContainerStyle: containerStyle,
    options: { disableDoubleClickZoom: true },
    ...callbacks,
  };

  if (shouldPosition) {
    mapProps.zoom = 12;
    mapProps.center = { lat: 51.5, lng: -0.1 };
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      loadingElement={<div style={{ height: `100%` }} />}
    >
      <GoogleMap {...mapProps}>
        {markers.map((marker, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: marker.lat, lng: marker.lng }}
              draggable
            />
          );
        })}

        {/* {midpoint && (
          <Marker
            position={{ lat: midpoint.lat, lng: midpoint.lng }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
        {polylines.map((polyline, i) => {
          const path = convertArrayToLatLng(polyline);
          return <Polyline key={i} path={path} />;
        })} */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map; //withScriptjs(withGoogleMap(Map));
