import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


import './styles/login-register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="header">Register</div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="button" type="submit">Register</button>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
  Already have an account?{' '}
  <Link to="/login" style={{ color: '#005c97', textDecoration: 'underline' }}>
    Click here to log in
  </Link>
</p>

        </form>
      </div>
    </div>
  );
}