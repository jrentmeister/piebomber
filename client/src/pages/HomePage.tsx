import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navigation />

      {/* Hero Section with Bomber Background */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">DROP IN FOR A<br />MISSION OF FLAVOR</h1>
          <p className="hero-subtitle">Portable pies. Nostalgic flavors. On a mission to your neighborhood.</p>
          <div className="hero-ctas">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/events')}
            >
              <span>📍</span> Find the Bomber
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/menu')}
            >
              <span>☰</span> Browse Pies
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍕</div>
              <h3>HANDCRAFTED PIES</h3>
              <p>Every pie is handcrafted with premium ingredients and baked to perfection in our mobile kitchen.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>MOBILE DELIVERY</h3>
              <p>We bring the flavor to you. Track our location and catch us at events throughout your city.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎉</div>
              <h3>EVENT CATERING</h3>
              <p>Make your event memorable with our catering services. Perfect for parties, weddings, and corporate events.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/catering')}
                style={{ marginTop: '16px' }}
              >
                Request Catering
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission">
        <div className="container">
          <h2>OUR MISSION</h2>
          <p className="mission-text">
            At Pie Bomber, we're on a mission to deliver nostalgic, homemade flavors
            straight to your neighborhood. Inspired by the spirit of adventure and classic
            American comfort food, we bring portable pies that taste like home—wherever you are.
          </p>
          <button className="btn btn-outline" onClick={() => navigate('/menu')}>
            EXPLORE OUR MENU
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Pie Bomber. All rights reserved.</p>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate('/menu')}>Menu</button>
            <button className="footer-link" onClick={() => navigate('/events')}>Events</button>
            <button className="footer-link" onClick={() => navigate('/catering')}>Catering</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
