// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './styles/admindashboard.css';

export default function AdminDashboard() {
  const { role } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5;

  const fetchQuotes = async () => {
    const querySnapshot = await getDocs(collection(db, 'quotes'));
    const quotesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuotes(quotesData);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;
    await deleteDoc(doc(db, 'quotes', id));
    fetchQuotes();
  };

  const handleStatusChange = async (id, newStatus) => {
    const quoteRef = doc(db, 'quotes', id);
    await updateDoc(quoteRef, { status: newStatus });
    fetchQuotes();
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    let result = quotes;
    if (searchTerm) {
      result = result.filter(q => (
        q.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
    if (statusFilter) {
      result = result.filter(q => q.status === statusFilter);
    }
    setFilteredQuotes(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, quotes]);

  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (role !== 'admin') {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">All Quotes</h2>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search by name, email or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="admin-quote-list">
        {currentQuotes.map((quote, index) => (
          <div key={index} className="admin-quote-card">
            <p><strong>Name:</strong> {quote.firstName} {quote.lastName}</p>
            <p><strong>Email:</strong> {quote.email}</p>
            <p><strong>Vehicle:</strong> {quote.year} {quote.make} {quote.model} ({quote.vehicleType})</p>
            <p><strong>From:</strong> {quote.pickupLocation}</p>
            <p><strong>To:</strong> {quote.dropoffLocation}</p>
            <p><strong>Drivability:</strong> {quote.drivability}</p>
            <p><strong>Trailer Type:</strong> {quote.trailerType}</p>
            <p><strong>Status:</strong>
              <select
                value={quote.status || 'Pending'}
                onChange={(e) => handleStatusChange(quote.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </p>
            <button onClick={() => handleDelete(quote.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredQuotes.length / quotesPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
