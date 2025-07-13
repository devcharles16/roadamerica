// src/pages/Contact.jsx
import React from 'react';
import './styles/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Road America Auto Transport</h2>
      <p className="contact-description">Have questions about shipping your vehicle? Get in touch with us today!</p>

      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-details">
        <p>Email: support@roadamericaautotransport.com</p>
        <p>Phone: (754) 600-5772</p>
        <p>Business Hours: Mon–Fri, 9am–6pm EST</p>
      </div>
    </div>
  );
}
