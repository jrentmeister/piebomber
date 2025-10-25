import Navigation from '../components/Navigation';
import './OurStoryPage.css';

function OurStoryPage() {
  return (
    <div className="our-story-page">
      <Navigation />

      {/* Hero Section */}
      <header className="story-hero">
        <div className="container">
          <h1>OUR STORY</h1>
          <p className="hero-tagline">A Mission Born from Passion</p>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="mission-statement">
        <div className="container">
          <div className="mission-content">
            <h2>THE PIEBOMBER MISSION</h2>
            <p>
              PieBomber was founded with a simple mission: to deliver explosive flavor to
              communities through handcrafted pies made with premium ingredients and
              nostalgic recipes. What started as a passion project has become a full-scale
              operation, deploying our mobile kitchen to neighborhoods across the region.
            </p>
            <p>
              We believe great food brings people together. Whether it's a wood-fired pizza
              pie, a savory pot pie, or a classic dessert, each creation is crafted with
              precision and care. Our commitment to quality and community drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Flight Timeline */}
      <section className="flight-timeline">
        <div className="container">
          <h2>OUR FLIGHT PLAN</h2>
          <p className="timeline-intro">From concept to community favorite</p>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-icon">🎯</span>
              </div>
              <div className="timeline-content">
                <h3>2020 - THE CONCEPT</h3>
                <p>
                  The idea was born: bring chef-quality pies directly to the people.
                  After months of recipe testing and retrofitting a vintage food truck,
                  PieBomber was ready for deployment.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-icon">🚀</span>
              </div>
              <div className="timeline-content">
                <h3>2021 - FIRST MISSION</h3>
                <p>
                  We launched at our first farmers market. The response was overwhelming—
                  lines stretched around the block. We knew we had something special.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-icon">📍</span>
              </div>
              <div className="timeline-content">
                <h3>2022 - EXPANDING TERRITORY</h3>
                <p>
                  From festivals to corporate events, PieBomber became a regional favorite.
                  We added catering services and expanded our menu to include seasonal
                  specialties and custom creations.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-icon">⭐</span>
              </div>
              <div className="timeline-content">
                <h3>2023 - AWARD WINNING</h3>
                <p>
                  Recognized as "Best Food Truck" by the Regional Food Association.
                  Featured in local publications and named a must-visit destination
                  for food enthusiasts.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-icon">🎊</span>
              </div>
              <div className="timeline-content">
                <h3>2024 - MISSION CONTINUES</h3>
                <p>
                  Today, PieBomber continues to serve communities with the same passion
                  and dedication. Every pie tells a story, and we're grateful to share
                  ours with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nostalgia Section */}
      <section className="nostalgia-section">
        <div className="container">
          <h2>FUEL UP ON NOSTALGIA</h2>
          <p className="nostalgia-intro">
            Behind every pie is a story, a memory, a moment that takes you back. We craft
            our recipes with the flavors that remind us of home, family, and the simple
            joy of sharing a meal together.
          </p>

          <div className="nostalgia-grid">
            <div className="nostalgia-card">
              <div className="nostalgia-image">
                <img
                  src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&h=600&fit=crop"
                  alt="The Pie Bomber food truck"
                  loading="lazy"
                />
              </div>
              <h3>THE BOMBER</h3>
              <p>
                Our vintage food truck, lovingly restored and equipped with a custom
                wood-fired oven, travels to bring fresh pies to your neighborhood.
              </p>
            </div>

            <div className="nostalgia-card">
              <div className="nostalgia-image">
                <img
                  src="https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=800&h=600&fit=crop"
                  alt="Fresh ingredients"
                  loading="lazy"
                />
              </div>
              <h3>QUALITY INGREDIENTS</h3>
              <p>
                We source locally whenever possible, using fresh seasonal produce and
                premium ingredients to create pies that taste like home.
              </p>
            </div>

            <div className="nostalgia-card">
              <div className="nostalgia-image">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
                  alt="Community gathering"
                  loading="lazy"
                />
              </div>
              <h3>COMMUNITY FIRST</h3>
              <p>
                Every event is an opportunity to connect. We're not just serving food—
                we're building relationships and creating memories one pie at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurStoryPage;
