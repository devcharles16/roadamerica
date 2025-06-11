import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import FAQ from '././pages/FAQ';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

document.body.style.fontFamily = 'Poppins, sans-serif';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, role } = useAuth();
  return user && role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;