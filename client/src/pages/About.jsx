import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page container">
      <section className="about-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Empowering Local <span className="text-blue">Technicians</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          TechFinder is India's most trusted platform for finding verified local service professionals. 
          Our mission is to bridge the gap between skilled technicians and customers who need reliable service.
        </motion.p>
      </section>

      <section className="about-grid">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Started in 2026, TechFinder was born out of a simple problem: the difficulty of finding 
            trustworthy technicians in local neighborhoods. We realized that while there is an 
            abundance of skilled professionals in India, they often lack a digital presence to reach 
            customers effectively.
          </p>
          <p>
            Today, we are proud to support thousands of technicians from UP, Bihar, Delhi, and beyond, 
            helping them grow their businesses while providing customers with peace of mind.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="About TechFinder" />
        </div>
      </section>

      <section className="values-section">
        <h2 className="section-title text-center">Why Choose Us?</h2>
        <div className="values-grid">
          <div className="value-card">
            <ShieldCheck size={40} className="value-icon" />
            <h3>Verified Profiles</h3>
            <p>Every technician on our platform undergoes a rigorous background check and verification process.</p>
          </div>
          <div className="value-card">
            <Users size={40} className="value-icon" />
            <h3>Community First</h3>
            <p>We empower local skilled workers by giving them the tools to manage and grow their professional digital identity.</p>
          </div>
          <div className="value-card">
            <Target size={40} className="value-icon" />
            <h3>Quality Service</h3>
            <p>Our rating and review system ensures that only the best performers thrive, maintaining high service standards.</p>
          </div>
          <div className="value-card">
            <Award size={40} className="value-icon" />
            <h3>Fair Pricing</h3>
            <p>We promote transparent hourly rates, ensuring both technicians and customers get a fair deal every time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
