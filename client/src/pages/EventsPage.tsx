import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useEvents } from '../hooks/useEvents';
import './EventsPage.css';

function EventsPage() {
  const navigate = useNavigate();
  const { data: eventsData, isLoading, error } = useEvents({ upcoming: true });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const formatTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };

  const getCapacityPercentage = (current: number, max: number | null) => {
    if (!max) return 0;
    return (current / max) * 100;
  };

  return (
    <div className="events-page">
      <Navigation />

      {/* Hero Section */}
      <section className="events-hero">
        <div className="container events-layout">
          {/* Left: Food Truck Image */}
          <div className="food-truck-section">
            <div className="food-truck-image">
              <img
                src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1200&h=800&fit=crop"
                alt="The Pie Bomber Food Truck"
              />
              <div className="truck-overlay">
                <h2>THE PIE BOMBER</h2>
              </div>
            </div>
          </div>

          {/* Right: Mission Schedule */}
          <div className="mission-schedule">
            <h1>MISSION SCHEDULE</h1>
            <p className="schedule-subtitle">Track our next deployment locations</p>

            {isLoading && <p className="loading">Loading mission schedule...</p>}

            {error && (
              <div className="error-message">
                <p>Failed to load schedule. Please try again later.</p>
              </div>
            )}

            {eventsData && eventsData.data.length === 0 && (
              <p className="no-events">No missions scheduled. Check back soon!</p>
            )}

            {eventsData && eventsData.data.length > 0 && (
              <div className="mission-list">
                {eventsData.data.map((event) => {
                  const { day, month } = formatDate(event.startTime);
                  const capacityPercent = getCapacityPercentage(
                    event.currentAttendees,
                    event.maxCapacity
                  );

                  return (
                    <div key={event.id} className="mission-card">
                      <div className="mission-date">
                        <span className="date-day">{day}</span>
                        <span className="date-month">{month}</span>
                      </div>
                      <div className="mission-details">
                        <h3>{event.title.toUpperCase()}</h3>
                        <div className="mission-info">
                          <p className="mission-time">
                            <span className="icon">🕐</span> {formatTime(event.startTime, event.endTime)}
                          </p>
                          <p className="mission-location">
                            <span className="icon">📍</span> {event.location}
                          </p>
                        </div>
                        {event.maxCapacity && (
                          <div className="mission-capacity">
                            <div className="capacity-bar">
                              <div
                                className="capacity-fill"
                                style={{ width: `${capacityPercent}%` }}
                              ></div>
                            </div>
                            <span className="capacity-text">
                              {event.currentAttendees} / {event.maxCapacity} attendees
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="events-cta">
        <div className="container">
          <h2>PLAN YOUR OWN MISSION</h2>
          <p>Book the Pie Bomber for your private event or celebration</p>
          <button className="btn btn-primary" onClick={() => navigate('/catering')}>
            REQUEST CATERING
          </button>
        </div>
      </section>
    </div>
  );
}

export default EventsPage;
