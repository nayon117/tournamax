"use client";
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Define the default Leaflet icon
const DefaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', 
  shadowSize: [41, 41], 
});

// Array of markers
const markers: { position: LatLngExpression; label: string }[] = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

// Component to center the map on marker click
const CenterMapOnClick = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

const CustomMap: React.FC = () => {
  const [center, setCenter] = useState<LatLngExpression>(markers[0].position);

  return (
    <MapContainer center={center} zoom={4} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={DefaultIcon}
          eventHandlers={{
            click: () => {
              setCenter(marker.position);
            },
          }}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      <CenterMapOnClick position={center} />
    </MapContainer>
  );
};

export default CustomMap;
