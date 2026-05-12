import React from 'react';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Wrench className="logo-icon" size={32} />
          <span>TechFinder</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {userInfo ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={logoutHandler} className="nav-link logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary register-btn">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
