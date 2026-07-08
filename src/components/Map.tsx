'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { cities } from '@/data/cities';
import CityCard from './CityCard';
import { useTheme } from '@/context/ThemeContext';
import { useTime } from '@/context/TimeContext';
import L from 'leaflet';

// Custom icon for the marker
const cityIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const Map: React.FC = () => {
  const { theme } = useTheme();
  const { utcTime } = useTime();
  const map = useMap();
  const [hoveredCity, setHoveredCity] = useState<typeof cities[number] | null>(null);

  useEffect(() => {
    if (!map) return;

    // Set the view to show all markers
    const group = new L.featureGroup();
    cities.forEach(city => {
      const marker = new L.Marker([city.lat, city.lng], { icon: cityIcon });
      group.addLayer(marker);
    });
    if (group.getLayers().length > 0) {
      map.fitBounds(group.getBounds().pad(0.2));
    }

    // Update the tile layer based on theme
    const removeLayers = () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
    };

    removeLayers();

    if (theme === 'dark') {
      new L.TileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);
    } else {
      new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  }, [map, theme]);

  useEffect(() => {
    // Update the popup content when the time changes (every minute)
    // We don't need to do anything because the CityCard uses the time context which updates.
  }, [utcTime]);

  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
    >
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={cityIcon}
          eventHandlers={{
            mouseover: () => setHoveredCity(city),
            mouseout: () => setHoveredCity(null)
          }}
        />
      ))}
      {hoveredCity && (
        <Popup
          position={[hoveredCity.lat, hoveredCity.lng]}
          className="custom-popup"
          closeButton={false}
          autoClose={false}
        >
          <CityCard city={hoveredCity} />
        </Popup>
      )}
    </MapContainer>
  );
};

export default Map;