// src/pages/Services.jsx
import React from 'react';
import './styles/services.css';

export default function Services() {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Auto Transport Services</h2>
      <div className="service-grid">
        <div className="service-card">
          <h3 className="service-title">Open Transport</h3>
          <p className="service-description">
            Our most affordable option, ideal for standard vehicles. Your car will be safely shipped on an open trailer along with other vehicles.
          </p>
        </div>
        <div className="service-card">
          <h3 className="service-title">Enclosed Transport</h3>
          <p className="service-description">
            Provides maximum protection from weather and road debris. Best suited for luxury, classic, or exotic cars.
          </p>
        </div>
        <div className="service-card">
          <h3 className="service-title">Door-to-Door Service</h3>
          <p className="service-description">
            We pick up and deliver your vehicle directly to your specified addresses, making the process smooth and convenient.
          </p>
        </div>
        <div className="service-card">
          <h3 className="service-title">Expedited Shipping</h3>
          <p className="service-description">
            Need it fast? Our expedited option ensures your vehicle is prioritized and delivered as quickly as possible.
          </p>
        </div>
        <div className="service-card">
          <h3 className="service-title">Seasonal Transport</h3>
          <p className="service-description">
            Heading south for the winter or north for the summer? We offer convenient seasonal car shipping to help you relocate with ease.
          </p>
        </div>
      </div>
    </div>
  );
}
