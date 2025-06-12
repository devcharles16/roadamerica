// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './styles/dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const querySnapshot = await getDocs(collection(db, 'quotes'));
      const quotesData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(q => q.email === user.email);
      setQuotes(quotesData);
    };

    if (user?.email) fetchQuotes();
  }, [user]);

  const getStatusProgress = (status) => {
    switch (status) {
      case 'Confirmed': return 50;
      case 'Completed': return 100;
      default: return 25;
    }
  };

  const getStatusBarColor = (status) => {
    switch (status) {
      case 'Confirmed': return '#2a9d8f';
      case 'Completed': return '#264653';
      default: return '#e9c46a';
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Quotes</h2>
      <div className="dashboard-quote-list">
        {quotes.map((quote, index) => (
          <div key={index} className="dashboard-quote-card">
            <div style={{
              height: '24px',
              width: '100%',
              backgroundColor: '#ddd',
              borderRadius: '4px',
              marginBottom: '10px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: `${getStatusProgress(quote.status)}%`,
                height: '100%',
                backgroundColor: getStatusBarColor(quote.status),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'width 0.3s ease'
              }}>
                {quote.status || 'Pending'}
              </div>
            </div>
            <p><strong>Vehicle:</strong> {quote.year} {quote.make} {quote.model} ({quote.vehicleType})</p>
            <p><strong>From:</strong> {quote.pickupLocation}</p>
            <p><strong>To:</strong> {quote.dropoffLocation}</p>
            <p><strong>Drivability:</strong> {quote.drivability}</p>
            <p><strong>Trailer Type:</strong> {quote.trailerType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
