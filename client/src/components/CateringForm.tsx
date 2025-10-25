import { useState, FormEvent } from 'react';
import { useCateringRequest } from '../hooks/useCatering';
import './CateringForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  location: string;
  message: string;
  menuPreferences: string[];
  dietaryRestrictions: string;
  budget: string;
}

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Festival/Fair',
  'Graduation',
  'Other',
];

const menuOptions = [
  'Pizza Pies',
  'Savory Pies',
  'Dessert Pies',
  'Vegetarian Options',
  'Vegan Options',
  'Gluten-Free Options',
];

function CateringForm() {
  const { mutate: submitRequest, isPending, isSuccess, error } = useCateringRequest();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    location: '',
    message: '',
    menuPreferences: [],
    dietaryRestrictions: '',
    budget: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const currentPreferences = prev.menuPreferences;
      const newPreferences = currentPreferences.includes(option)
        ? currentPreferences.filter((p) => p !== option)
        : [...currentPreferences, option];
      return { ...prev, menuPreferences: newPreferences };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Convert eventDate to ISO string for API
    const eventDateISO = new Date(formData.eventDate).toISOString();

    submitRequest({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventDate: eventDateISO,
      eventType: formData.eventType,
      guestCount: parseInt(formData.guestCount, 10),
      location: formData.location,
      message: formData.message || undefined,
      menuPreferences: formData.menuPreferences.length > 0 ? formData.menuPreferences : undefined,
      dietaryRestrictions: formData.dietaryRestrictions || undefined,
      budget: formData.budget || undefined,
    });
  };

  if (isSuccess) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3>Request Submitted Successfully!</h3>
        <p>
          Thank you for your interest in PieBomber catering. We've received your request
          and will contact you within 24 hours with a custom quote.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form className="catering-form" onSubmit={handleSubmit}>
      {/* Contact Information */}
      <div className="form-section">
        <h3>Contact Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="form-section">
        <h3>Event Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventType">
              Event Type <span className="required">*</span>
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select event type...</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">
              Event Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guestCount">
              Expected Guest Count <span className="required">*</span>
            </label>
            <input
              type="number"
              id="guestCount"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Estimated Budget (Optional)</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
            >
              <option value="">Select budget range...</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-2500">$1,000 - $2,500</option>
              <option value="2500-5000">$2,500 - $5,000</option>
              <option value="over-5000">Over $5,000</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">
            Event Location <span className="required">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City, State or full address"
            required
          />
        </div>
      </div>

      {/* Menu Preferences */}
      <div className="form-section">
        <h3>Menu Preferences</h3>
        <div className="checkbox-group">
          {menuOptions.map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.menuPreferences.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="dietaryRestrictions">
            Dietary Restrictions or Allergies (Optional)
          </label>
          <textarea
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleInputChange}
            rows={3}
            placeholder="Let us know about any dietary restrictions or allergies..."
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="form-section">
        <h3>Additional Information</h3>
        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            placeholder="Tell us more about your event, special requests, or any questions..."
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="form-error">
          <p>Failed to submit request. Please try again or contact us directly.</p>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default CateringForm;
