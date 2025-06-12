// src/pages/Quote.jsx
import React, { useState, useEffect } from 'react';
import '../styles.css';
import useGeoapifyAutocomplete from '../utils/useGeoapifyAutocomplete';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';


export default function Quote() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    year: '',
    make: '',
    model: '',
    pickup: '',
    dropoff: '',
    drivability: '',
    trailerType: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const pickupSuggestions = useGeoapifyAutocomplete(formData.pickup);
  const dropoffSuggestions = useGeoapifyAutocomplete(formData.dropoff);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`);
        const data = await response.json();
        setMakes(data.Results.map(item => item.MakeName));
      } catch (err) {
        console.error('Failed to fetch makes:', err);
      }
    };
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (!formData.make) return;
      try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${formData.make}?format=json`);
        const data = await response.json();
        setModels(data.Results.map(item => item.Model_Name));
      } catch (err) {
        console.error('Failed to fetch models:', err);
      }
    };
    fetchModels();
  }, [formData.make]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      await emailjs.send(
        'service_z632v1e',
        'template_xml5eea',
        {
          vehicle_type: formData.vehicleType,
          year: formData.year,
          make: formData.make,
          model: formData.model,
          pickup: formData.pickup,
          dropoff: formData.dropoff,
          drivability: formData.drivability,
          trailer_type: formData.trailerType,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
        '6gHn9DXgeKNWOzubW'
      );
      alert('Quote submitted successfully!');
      setFormData({
        vehicleType: '',
        year: '',
        make: '',
        model: '',
        pickup: '',
        dropoff: '',
        drivability: '',
        trailerType: '',
        email: '',
        firstName: '',
        lastName: ''
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your quote. Please try again.');
    }
  };

  return (
    <div className="quote-form-container">
      <h2 className="quote-form-title">Request a Transport Quote</h2>
      <form onSubmit={handleSubmit} className="quote-form">
        <div className="form-group">
          <label>Vehicle Type</label>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Car">Car</option>
            <option value="Pickup">Pickup</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              name="year"
              className="compact-input"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Make</label>
            <input
              type="text"
              name="make"
              className="compact-input"
              value={formData.make}
              onChange={handleChange}
              list="make-options"
              required
            />
            <datalist id="make-options">
              {makes.map((make, index) => (
                <option key={index} value={make} />
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              name="model"
              className="compact-input"
              value={formData.model}
              onChange={handleChange}
              list="model-options"
              required
            />
            <datalist id="model-options">
              {models.map((model, index) => (
                <option key={index} value={model} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              name="pickup"
              className="compact-input"
              value={formData.pickup}
              onChange={handleChange}
              required
              list="pickup-suggestions"
            />
            <datalist id="pickup-suggestions">
              {pickupSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label>Drop Off Location</label>
            <input
              type="text"
              name="dropoff"
              className="compact-input"
              value={formData.dropoff}
              onChange={handleChange}
              required
              list="dropoff-suggestions"
            />
            <datalist id="dropoff-suggestions">
              {dropoffSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Drivability</label>
            <select name="drivability" value={formData.drivability} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Running">Running (Can drive onto trailer)</option>
              <option value="Not Running">Not Running</option>
            </select>
          </div>
          <div className="form-group">
            <label>Trailer Type</label>
            <select name="trailerType" value={formData.trailerType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Open">Open - Most Economical</option>
              <option value="Enclosed">Enclosed - Protects from the Elements</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="compact-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="compact-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="compact-input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Quote</button>
      </form>
    </div>
  );
}
