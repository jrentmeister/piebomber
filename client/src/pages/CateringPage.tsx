import Navigation from '../components/Navigation';
import CateringForm from '../components/CateringForm';
import './CateringPage.css';

function CateringPage() {
  return (
    <div className="catering-page">
      <Navigation />

      {/* Hero Header */}
      <header className="catering-hero">
        <div className="container">
          <h1>CATERING REQUISITION FORM</h1>
          <p>Request the Pie Bomber for your next mission</p>
        </div>
      </header>

      {/* Form Section */}
      <section className="catering-form-section">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>MISSION DETAILS</h2>
              <p>
                Fill out the requisition form below. Our command center will review your
                request and deploy a response within 24 hours.
              </p>
            </div>
            <CateringForm />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="catering-info">
        <div className="container">
          <h2>WHAT WE OFFER</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-number">01</div>
              <h3>FULL SERVICE DEPLOYMENT</h3>
              <p>
                Our mobile unit arrives ready for action. From setup to breakdown,
                we handle all operations so you can focus on your mission objectives.
              </p>
            </div>
            <div className="info-card">
              <div className="info-number">02</div>
              <h3>CUSTOM PIE ARSENAL</h3>
              <p>
                Work with our culinary command to design a custom menu. Pizza pies,
                savory selections, and sweet treats - all made fresh on-site.
              </p>
            </div>
            <div className="info-card">
              <div className="info-number">03</div>
              <h3>TACTICAL FLEXIBILITY</h3>
              <p>
                Accommodating dietary restrictions is part of our mission. Vegetarian,
                vegan, gluten-free - we adapt to serve all personnel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CateringPage;
