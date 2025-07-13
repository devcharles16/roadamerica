import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Road America Auto Transport
      </Link>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
        <Link to="/quote" className={location.pathname === '/quote' ? 'active' : ''}>Get a Quote</Link>
        <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link>
        <Link to="/faqs" className={location.pathname === '/faqs' ? 'active' : ''}>FAQs</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
        {user && <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>}
        {role === 'admin' && <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>}
        {user && (
  <li className="nav-user">Welcome, {user.displayName || user.email}</li>
)}

        {user ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
