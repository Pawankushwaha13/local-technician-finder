import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Briefcase } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const Auth = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = type === 'register' ? '/api/auth/register' : '/api/auth/login';
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (type === 'register') {
        // After registration, redirect to login page
        navigate('/login', { state: { message: 'Registration successful! Please login to continue.' } });
      } else {
        // After login, store info and go to dashboard
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <h2 className="auth-title">{type === 'register' ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="auth-subtitle">
          {type === 'register' 
            ? 'Join our community of technicians and service seekers.' 
            : 'Login to manage your bookings and profile.'}
        </p>

        {error && <div className="auth-error">{error}</div>}
        {successMessage && <div className="auth-success">{successMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {type === 'register' && (
            <div className="form-group">
              <label><UserIcon size={18} /> Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label><Mail size={18} /> Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label><Lock size={18} /> Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          {type === 'register' && (
            <div className="form-group">
              <label><Briefcase size={18} /> I am a:</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">Service Seeker (Customer)</option>
                <option value="technician">Technician (Pro)</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit">
            {type === 'register' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          {type === 'register' ? (
            <p>Already have an account? <Link to="/login">Login</Link></p>
          ) : (
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
