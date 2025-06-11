import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="text-xl font-bold" style={{ color: 'white' }}>RA Transport</div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/quote">Get a Quote</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}