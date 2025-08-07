import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Offer {
  pharmacy_lat?: number;
  pharmacy_lon?: number;
}

interface Props {
  offers: Offer[];
  center?: [number, number];
}

export default function MapView({ offers, center }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current).setView(center || [52.2297, 21.0122], center ? 13 : 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    offers.forEach((o) => {
      if (o.pharmacy_lat && o.pharmacy_lon) {
        L.marker([o.pharmacy_lat, o.pharmacy_lon]).addTo(map);
      }
    });
    return () => {
      map.remove();
    };
  }, [offers, center]);

  return <div id="map" ref={ref} style={{ height: '300px' }} />;
}
