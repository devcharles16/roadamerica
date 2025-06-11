import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Quote() {
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'quotes'), {
        userId: user.uid,
        pickupZip,
        deliveryZip,
        vehicleType,
        pickupDate,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });
      alert('Quote request submitted!');
      setPickupZip('');
      setDeliveryZip('');
      setVehicleType('');
      setPickupDate('');
    } catch (err) {
      console.error('Error adding quote:', err);
    }
  };

  return (
    <div className="container">
      <div className="header">Get a Quote</div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Pickup Zip Code</label>
          <input type="text" className="input" value={pickupZip} onChange={e => setPickupZip(e.target.value)} />

          <label>Delivery Zip Code</label>
          <input type="text" className="input" value={deliveryZip} onChange={e => setDeliveryZip(e.target.value)} />

          <label>Vehicle Type</label>
          <input type="text" className="input" value={vehicleType} onChange={e => setVehicleType(e.target.value)} />

          <label>Preferred Pickup Date</label>
          <input type="date" className="input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />

          <button className="button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}