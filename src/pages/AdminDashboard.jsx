import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchQuotes = async () => {
      const snapshot = await getDocs(collection(db, 'quotes'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
    };
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const quoteRef = doc(db, 'quotes', id);
    await updateDoc(quoteRef, { status: newStatus });
    setQuotes(prev =>
      prev.map(q => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const filteredQuotes = statusFilter === 'All'
    ? quotes
    : quotes.filter(quote => quote.status === statusFilter);

  return (
    <div className="container">
      <div className="header">Admin Dashboard - Manage Quotes</div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="statusFilter"><strong>Filter by status: </strong></label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {filteredQuotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        filteredQuotes.map((quote) => (
          <div className="card" key={quote.id}>
            <p><strong>User:</strong> {quote.userId}</p>
            <p><strong>From:</strong> {quote.pickupZip}</p>
            <p><strong>To:</strong> {quote.deliveryZip}</p>
            <p><strong>Vehicle:</strong> {quote.vehicleType}</p>
            <p><strong>Date:</strong> {quote.pickupDate}</p>
            <p>
              <strong>Status:</strong>
              <select
                value={quote.status}
                onChange={(e) => handleStatusChange(quote.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
