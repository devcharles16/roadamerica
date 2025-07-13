import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './styles/quote.css';

export default function Quote() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    vehicleType: '',
    year: '',
    make: '',
    model: '',
    pickupLocation: '',
    dropoffLocation: '',
    drivability: '',
    trailerType: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        userId: user ? user.uid : null,
        createdAt: new Date(),
        status: 'Pending', // ✅ Ensures status field exists for admin filter
      });
      alert('Quote submitted!');
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  return (
    <div className="quote-container">
      <h2>Request a Vehicle Transport Quote</h2>
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
        <div className="form-group">
          <label>Year</label>
          <input type="text" name="year" value={formData.year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Make</label>
          <input type="text" name="make" value={formData.make} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pickup Location</label>
          <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Dropoff Location</label>
          <input type="text" name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Drivability</label>
          <select name="drivability" value={formData.drivability} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Running">Running</option>
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
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
