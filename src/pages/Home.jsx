import { Link } from 'react-router-dom';
import './styles/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Road America Auto Transport</h1>
        <p>Reliable coast-to-coast vehicle shipping with real-time tracking and expert support.</p>
        <Link to="/quote" className="quote-button">Get a Quote</Link>
      </section>

      <section className="why-choose-us">
        <div className="section-inner-content">
          <div className="section-content">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Licensed, bonded, and insured for peace of mind</li>
              <li>Nationwide shipping and route coverage</li>
              <li>Open and enclosed trailer options</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>24/7 customer support & vehicle tracking</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-inner-content">
          <div className="section-content">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>1. Request a Quote</h3>
                <p>Submit details about your vehicle and route.</p>
              </div>
              <div className="step">
                <h3>2. Confirm & Schedule</h3>
                <p>Choose your transport type and preferred date.</p>
              </div>
              <div className="step">
                <h3>3. Track & Deliver</h3>
                <p>Track your vehicle and receive updates until delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="section-inner-content">
          <div className="section-content">
            <h2>What Our Customers Say</h2>
            <blockquote>"Road America made my cross-country move stress-free. Professional and quick!"</blockquote>
            <blockquote>"Highly recommend their enclosed trailer service—my classic car arrived flawless."</blockquote>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-inner-content">
          <div className="section-content">
            <h2>Ready to Ship?</h2>
            <p>Click below to get started with your vehicle transport quote today.</p>
            <Link to="/quote" className="quote-button">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
