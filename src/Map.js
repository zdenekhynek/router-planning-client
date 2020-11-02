import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Polyline } from "@react-google-maps/api";

import { getColorForIndex } from "./App";

export const LIBRARIES = ["geometry"];

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const convertArrayToLatLng = (arr) => {
  return arr.map(([lat, lng]) => ({ lat, lng }));
};

export const Map = ({ itinerary, callbacks = {} }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polylines, setPolylines] = useState([]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (window.google && itinerary && map) {
      const { decodePath } = window.google.maps.geometry.encoding;

      let newPolylines = [];
      let newMarkers = [];

      const newBounds = new window.google.maps.LatLngBounds();

      itinerary.forEach((routeArr, i) => {
        if (routeArr.length) {
          const route = routeArr[0];
          const points = route.steps.map((step) => step.polyline.points);

          newMarkers = newMarkers.concat([
            route.start.location,
            route.end.location,
          ]);

          newBounds.extend(route.start.location);
          newBounds.extend(route.end.location);

          if (points) {
            points.forEach((p) => {
              if (p) {
                const path = decodePath(p);
                const strokeColor = getColorForIndex(i);
                newPolylines.push({ path, strokeColor });
              }
            });
          }
        }
      });

      map.fitBounds(newBounds);

      setPolylines(newPolylines);
      setMarkers(newMarkers);
    }
  }, [window.google, itinerary, map]);

  console.log("itinerary", itinerary);
  const [shouldPosition, setShouldPosition] = useState(true);

  useEffect(() => {
    setTimeout(() => setShouldPosition(false), 2000);
  }, []);

  const mapProps = {
    mapContainerStyle: containerStyle,
    options: {
      disableDoubleClickZoom: true,
      fullscreenControl: false,
      mapTypeControl: false,
    },
    onLoad,
    onUnmount,
  };

  if (shouldPosition) {
    mapProps.zoom = 7;
    mapProps.center = { lat: 53.5, lng: -2 };
  }

  return (
    <LoadScript
      libraries={LIBRARIES}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      loadingElement={<div style={{ height: `100%` }} />}
    >
      <GoogleMap {...mapProps}>
        {markers.map((marker, i) => {
          return (
            <Marker key={i} position={{ lat: marker.lat, lng: marker.lng }} />
          );
        })}

        {polylines.map((polyline, i) => {
          const { path, strokeColor } = polyline;
          return <Polyline key={i} options={{ strokeColor, strokeWeight: 2 }} path={path} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map; //withScriptjs(withGoogleMap(Map));
