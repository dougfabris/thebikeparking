import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: -19.917299,
  lng: -43.934559,
};
const options = {
  styles: mapStyles
}

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY , 
    libraries
  });
  const [markers, setMarkers] = useState([]);

  const handleSetMarkers = (event) => {
    setMarkers((prevState) => [...prevState, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }])
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap 
      center={center} 
      zoom={8} 
      mapContainerStyle={mapContainerStyle}
      options={options}
      onClick={handleSetMarkers}
    >
      {markers?.map(marker => <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />)}
    </GoogleMap>);
};

export default Map;
