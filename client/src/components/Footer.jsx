import React from 'react';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            <Wrench className="logo-icon" size={24} />
            <span>TechFinder</span>
          </div>
          <p>Connecting you with the best local technicians for all your repair needs.</p>
        </div>
        
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><Link to="/technicians?category=Computer Repair">Computer Repair</Link></li>
            <li><Link to="/technicians?category=Electrical Repair">Electrical Repair</Link></li>
            <li><Link to="/technicians?category=AC Repair">AC Repair</Link></li>
            <li><Link to="/technicians?category=Plumbing">Plumbing Repair</Link></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/safety">Safety</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 TechFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
