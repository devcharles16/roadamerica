import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const q = query(collection(db, 'quotes'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
    };

    if (user?.uid) {
      fetchQuotes();
    }
  }, [user]);

  return (
    <div className="container">
      <div className="header">Vehicle Dashboard</div>
      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        quotes.map((quote) => (
          <div className="card" key={quote.id}>
            <p><strong>From:</strong> {quote.pickupZip}</p>
            <p><strong>To:</strong> {quote.deliveryZip}</p>
            <p><strong>Vehicle:</strong> {quote.vehicleType}</p>
            <p><strong>Date:</strong> {quote.pickupDate}</p>
            <p><strong>Status:</strong> {quote.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
