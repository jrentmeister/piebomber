import { Event } from '../lib/api';
import './EventMap.css';

interface EventMapProps {
  events: Event[];
}

function EventMap({ events }: EventMapProps) {
  // Get Google Maps API key from environment variable
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Use the first event's coordinates as the center, or default to San Francisco
  const firstEvent = events.find((e) => e.latitude && e.longitude);
  const centerLat = firstEvent?.latitude || '37.7749';
  const centerLng = firstEvent?.longitude || '-122.4194';

  // Create markers for all events with coordinates
  const markers = events
    .filter((event) => event.latitude && event.longitude)
    .map((event, index) => {
      const label = String.fromCharCode(65 + index); // A, B, C, etc.
      return `&markers=color:red%7Clabel:${label}%7C${event.latitude},${event.longitude}`;
    })
    .join('');

  // Build Google Maps Static API URL if API key is available
  const mapUrl = googleMapsApiKey
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=12&size=800x400&maptype=roadmap${markers}&key=${googleMapsApiKey}`
    : null;

  // If no API key, show embedded iframe (requires Events API or manual setup)
  const iframeUrl = `https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed`;

  return (
    <div className="event-map">
      <h2>Event Locations</h2>
      {googleMapsApiKey && mapUrl ? (
        <div className="map-container">
          <img src={mapUrl} alt="Event locations map" className="map-image" />
          <p className="map-note">
            Red markers show our upcoming event locations.
            Click on an event below for details.
          </p>
        </div>
      ) : (
        <div className="map-container">
          <iframe
            src={iframeUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event locations"
          ></iframe>
          <p className="map-note">
            📍 Centered on our event area. Add VITE_GOOGLE_MAPS_API_KEY to .env for enhanced map features.
          </p>
        </div>
      )}
    </div>
  );
}

export default EventMap;
