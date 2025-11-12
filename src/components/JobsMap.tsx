import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  payment: number;
  distance: string;
}

interface JobsMapProps {
  jobs: Job[];
}

// Mock coordinates for demo locations
const locationCoordinates: Record<string, [number, number]> = {
  "Sector 15, Noida": [77.3910, 28.5355],
  "Salt Lake, Kolkata": [88.4106, 22.6100],
  "Bandra West, Mumbai": [72.8265, 19.0596],
  "Indiranagar, Bangalore": [77.6408, 12.9716],
  "Koramangala, Bangalore": [77.6270, 12.9352],
};

export const JobsMap = ({ jobs }: JobsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Initialize map centered on India
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each job
    jobs.forEach((job) => {
      const coords = locationCoordinates[job.location];
      if (coords && map.current) {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.style.width = '32px';
        markerEl.style.height = '32px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = 'hsl(var(--primary))';
        markerEl.style.display = 'flex';
        markerEl.style.alignItems = 'center';
        markerEl.style.justifyContent = 'center';
        markerEl.style.cursor = 'pointer';
        markerEl.style.border = '3px solid hsl(var(--background))';
        markerEl.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        markerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: 600; margin-bottom: 4px; color: hsl(var(--foreground));">${job.title}</h3>
            <p style="font-size: 12px; color: hsl(var(--muted-foreground)); margin-bottom: 4px;">${job.location}</p>
            <p style="font-weight: 600; color: hsl(var(--primary)); font-size: 14px;">₹${job.payment}</p>
          </div>
        `);

        new mapboxgl.Marker(markerEl)
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(map.current);
      }
    });

    // Fit map to show all markers
    if (jobs.length > 0) {
      const validCoords = jobs
        .map(job => locationCoordinates[job.location])
        .filter(Boolean);
      
      if (validCoords.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        validCoords.forEach(coord => bounds.extend(coord));
        map.current?.fitBounds(bounds, { padding: 50 });
      }
    }

    return () => {
      map.current?.remove();
    };
  }, [jobs, tokenSubmitted, mapboxToken]);

  if (!tokenSubmitted) {
    return (
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">View Jobs on Map</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to see job locations on an interactive map.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Get your free token at{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="pk.eyJ1Ijoi..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={() => setTokenSubmitted(true)}
            disabled={!mapboxToken}
          >
            Load Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div ref={mapContainer} className="w-full h-[400px]" />
    </Card>
  );
};
