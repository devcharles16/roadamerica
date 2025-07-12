import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


import './styles/login-register.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="header">Login</div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="button" type="submit">Login</button>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
  Not Registered?{' '}
  <Link to="/register" style={{ color: '#005c97', textDecoration: 'underline' }}>
    Click here to create an account
  </Link>
</p>

        </form>
      </div>
    </div>
  );
}
