//useRef is used to get references, a pointer at a real DOM node;
//or create variables which survive re-render cycles of our components and don't lose their value;
import React, { useRef, useEffect } from 'react';
import { loadGoogleMapsScript } from '../../helpers/util/map.script.js';

import './Map.scss';

const Map = ({ center, zoom, styles }) => {
  const mapRef = useRef();

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMapsScript(process.env.REACT_APP_GOOGLE_API_KEY);
        // create map in div by using ref as references to real DOM
        // Map()  - creates a new map inside of the given HTML container
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
        });

        //create Marker that identifies a location on a map.  position: {lat, lng} - initial location of marker, map: optional on which map to place the marker
        // eslint-disable-next-line no-unused-vars
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: center,
          map,
        });
      } catch (err) {
        console.error('Failed to load Google Maps:', err);
      }
    };

    initMap();
  }, [center, zoom]);

  return <div className="map" style={styles} ref={mapRef}></div>;
};

export default Map;
