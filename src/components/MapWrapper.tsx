'use client';
import { useEffect, useState } from 'react';

export default function MapWrapper() {
  const [MapComponent, setMapComponent] = useState<any>(() => null);

  useEffect(() => {
    import('./Map').then((module) => {
      setMapComponent(module.default);
    });
  }, []);

  if (!MapComponent) {
    return <div>Loading map…</div>;
  }

  return <MapComponent />;
}