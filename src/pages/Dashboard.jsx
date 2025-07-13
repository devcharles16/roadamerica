import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import './styles/dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'quotes'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
    });
    return () => unsubscribe();
  }, [user]);

  const getStatusStep = (status) => {
    const steps = ['submitted', 'driver assigned', 'in transit', 'delivered'];
    const index = steps.indexOf(status.toLowerCase());
    return index >= 0 ? index + 1 : 0;
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, {user?.displayName || user?.email}</h2>

      <h2>Your Submitted Quotes</h2>
      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        quotes.map((quote) => {
          const step = getStatusStep(quote.status || 'submitted');
          const cancelled = quote.status?.toLowerCase() === 'cancelled';

          return (
            <div key={quote.id} className="quote-card">
              <p><strong>Vehicle:</strong> {quote.year} {quote.make} {quote.model}</p>
              <p><strong>From:</strong> {quote.pickupLocation}</p>
              <p><strong>To:</strong> {quote.dropoffLocation}</p>
              <p><strong>Status:</strong> {quote.status || 'Submitted'}</p>

              <div className={`progress-bar ${cancelled ? 'cancelled' : ''}`}>
                {['Submitted', 'Driver Assigned', 'In Transit', 'Delivered'].map((label, idx) => (
                  <div
                    key={label}
                    className={`progress-step ${step > idx ? 'active' : ''}`}
                  >
                    <div className="circle">{idx + 1}</div>
                    <div className="label">{label}</div>
                  </div>
                ))}
              </div>

              {cancelled && <div className="cancelled-label">Cancelled</div>}
            </div>
          );
        })
      )}
    </div>
  );
}
