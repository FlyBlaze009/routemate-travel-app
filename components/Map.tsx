'use client';
import { Location } from '@/app/generated/prisma';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapProps {
  itineraries: Location[];
}
const Map = ({ itineraries }: MapProps) => {
  const center: LatLngExpression =
    itineraries.length > 0
      ? [itineraries[0].lat, itineraries[0].lng]
      : [51.51, -0.12];

  console.log(itineraries);
  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {itineraries.map((location) => (
        <Marker position={[location.lat, location.lng]} key={location.id}>
          <Popup>{location.locationTitle}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
