//useRef is used to get references, a pointer at a real DOM node;
//or create variables which survive re-render cycles of our components and don't lose their value;
import React, { useRef, useEffect } from 'react';

import './Map.scss';

const Map = ({ center, zoom, styles }) => {
  const mapRef = useRef();

  useEffect(() => {
    // create map in div by using ref as references to real DOM
    // Map()  - creates a new map inside of the given HTML container
    const map = new window.google.maps.Map(mapRef.current, {
      center: center, //
      zoom: zoom, // how to display the map where 0 - Earth
    });
    //create Marker that indentifies a location on a map.  position: {lat, lng} - initial location of marker, map: optional on which map to place the marker
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]); //when the dependecies empty array, it render only once when the component is initial mounted

  return <div className="map" style={styles} ref={mapRef}></div>;
};

export default Map;
