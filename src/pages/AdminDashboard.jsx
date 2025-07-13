import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './styles/admindashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5;

  const statusOptions = [
    'Submitted',
    'Driver Assigned',
    'In Transit',
    'Delivered',
    'Cancelled',
  ];

  const fetchQuotes = async () => {
    try {
      const snapshot = await getDocs(query(collection(db, 'quotes'), orderBy('createdAt', 'desc')));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        await deleteDoc(doc(db, 'quotes', id));
        fetchQuotes();
      } catch (error) {
        console.error('Error deleting quote:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'quotes', id), {
        status: newStatus,
      });
      fetchQuotes();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredQuotes = quotes
    .filter((quote) =>
      `${quote.firstName} ${quote.lastName} ${quote.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((quote) => (statusFilter === 'All' ? true : quote.status === statusFilter));

  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="quote-list">
        {currentQuotes.length === 0 ? (
          <p>No quotes found.</p>
        ) : (
          currentQuotes.map((quote) => (
            <div className="quote-card" key={quote.id}>
              <div><strong>Name:</strong> {quote.firstName} {quote.lastName}</div>
              <div><strong>Email:</strong> {quote.email}</div>
              <div><strong>Vehicle:</strong> {quote.year} {quote.make} {quote.model}</div>
              <div><strong>Pickup:</strong> {quote.pickupLocation}</div>
              <div><strong>Dropoff:</strong> {quote.dropoffLocation}</div>
              <div><strong>Status:</strong>
                <select
                  value={quote.status || 'Submitted'}
                  onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(quote.id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}
