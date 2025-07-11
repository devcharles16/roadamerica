import './styles/quote.css';

export default function Quote() {
  return (
    <div className="quote-container">
      <section className="quote-hero">
        <h1>Request a Vehicle Transport Quote</h1>
        <p>Fill out the form below to receive a personalized quote for your transport needs.</p>
      </section>

      <section className="quote-form-section">
        <form className="quote-form">
          <div className="form-group">
            <label>Vehicle Type</label>
            <select required>
              <option value="">Select Type</option>
              <option>Car</option>
              <option>Pickup</option>
              <option>SUV</option>
              <option>Van</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Make</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input type="text" required />
            </div>
          </div>

          <div className="form-group">
            <label>Pickup Location</label>
            <input type="text" placeholder="City, State OR Zip" required />
          </div>

          <div className="form-group">
            <label>Drop Off Location</label>
            <input type="text" placeholder="City, State OR Zip" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Drivability</label>
              <select required>
                <option value="">Select</option>
                <option>Running</option>
                <option>Not Running</option>
              </select>
            </div>
            <div className="form-group">
              <label>Trailer Type</label>
              <select required>
                <option value="">Select</option>
                <option>Open - Most Economical</option>
                <option>Enclosed - Protects from the Elements</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" required />
            </div>
          </div>

          <button type="submit" className="quote-submit">Submit Quote Request</button>
        </form>
      </section>
    </div>
  );
}
