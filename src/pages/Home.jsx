// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Road America Auto Transport</h1>
        <p>Your trusted partner in nationwide vehicle transport.</p>
        <Link to="/quote" className="quote-button">Get a Quote</Link>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ Fast, reliable service across the U.S.</li>
          <li>✔ Open and enclosed trailer options</li>
          <li>✔ Real-time quote tracking</li>
          <li>✔ Transparent pricing & no hidden fees</li>
        </ul>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Request a Quote</h3>
            <p>Fill out our simple form to get started.</p>
          </div>
          <div className="step">
            <h3>2. Get Matched with a Carrier</h3>
            <p>We find the best transporter for your needs.</p>
          </div>
          <div className="step">
            <h3>3. Vehicle Pickup</h3>
            <p>Your vehicle is safely loaded and on its way.</p>
          </div>
          <div className="step">
            <h3>4. Vehicle Delivery</h3>
            <p>Delivered to your door or a nearby location.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <blockquote>
          "Smooth and fast process. My SUV was delivered ahead of schedule!" – Jessica M.
        </blockquote>
        <blockquote>
          "Road America kept me updated the entire time. Highly recommend!" – Carlos R.
        </blockquote>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>We make auto transport simple and hassle-free. Click below to request your quote now.</p>
        <Link to="/quote" className="quote-button">Request a Quote</Link>
      </section>
    </div>
  );
}
