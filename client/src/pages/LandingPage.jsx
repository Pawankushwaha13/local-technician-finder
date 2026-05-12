import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title"
          >
            Find Trusted Local <span className="text-blue">Technicians</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle"
          >
            Connect with verified professionals for computer repairs, mobile fixes, car electronics, and smart home installations. Get quality service from experts in your area.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-actions"
          >
            <Link to="/register" className="btn btn-primary">
              Get Started Now <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>
      

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <h3>Verified Pros</h3>
              <p>Every technician is background-checked and verified for quality.</p>
            </div>
            <div className="feature-card">
              <h3>Instant Booking</h3>
              <p>Book a slot that fits your schedule in just a few clicks.</p>
            </div>
            <div className="feature-card">
              <h3>Fair Pricing</h3>
              <p>Transparent pricing with no hidden fees or surprises.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
