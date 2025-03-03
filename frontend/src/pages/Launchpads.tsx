import { FC } from 'react';
import Layout from '../components/layout/Layout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLaunchpads } from '../hooks/useLaunchpads';
import { Launchpad } from '../types/launchpads';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LaunchpadsPage: FC = () => {
  const { data: launchpads, isLoading, isError, error } = useLaunchpads();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const center: L.LatLngExpression = [28.5618571, -80.577366];

  return (
    <Layout>
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            SpaceX <span className="text-blue-400">Launchpads</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Explore the locations where SpaceX launches its rockets.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {launchpads && (
          <MapContainer
            center={center}
            zoom={4}
            style={{ height: '800px', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {launchpads.map((launchpad: Launchpad) => (
              <Marker
                key={launchpad.id}
                position={[launchpad.latitude, launchpad.longitude]}
              >
                <Popup>
                  <h3 className="font-bold">{launchpad.full_name}</h3>
                  <p>{launchpad.locality}, {launchpad.region}</p>
                  <p>Status: {launchpad.status}</p>
                  <p>Launches: {launchpad.launch_successes} / {launchpad.launch_attempts}</p>
                  <p>{launchpad.details}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </Layout>
  );
};

export default LaunchpadsPage;
