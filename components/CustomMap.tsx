"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Dynamically import the leaflet library to avoid SSR issues
const L = typeof window !== 'undefined' ? require('leaflet') : undefined;

// Define the default Leaflet icon
const DefaultIcon = L
  ? new L.Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
    })
  : undefined;

const markers: { position: LatLngExpression; label: string }[] = [
  { position: [28.6139, 77.209], label: 'New Delhi' },
  { position: [19.076, 72.8777], label: 'Mumbai' },
  { position: [13.0827, 80.2707], label: 'Chennai' },
  { position: [22.5726, 88.3639], label: 'Kolkata' },
  { position: [12.9716, 77.5946], label: 'Bangalore' },
];

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
    </MapContainer>
  );
};

// Dynamically import the CustomMap component to ensure it only runs on the client-side
export default dynamic(() => Promise.resolve(CustomMap), { ssr: false });
