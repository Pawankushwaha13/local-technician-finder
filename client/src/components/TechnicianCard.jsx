import React from 'react';
import { Star, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TechnicianCard.css';

const TechnicianCard = ({ technician }) => {
  return (
    <div className="tech-card">
      <div className="tech-card-header">
        <div className="tech-avatar">
          {technician.image ? (
            <img src={`http://localhost:5000${technician.image}`} alt={technician.user?.name} className="tech-img" />
          ) : (
            technician.user?.name?.charAt(0) || 'T'
          )}
        </div>
        <div className="tech-info">
          <div className="tech-name-row">
            <h3>{technician.user?.name || 'Technician'}</h3>
            {technician.isVerified && <ShieldCheck className="verified-icon" size={18} />}
          </div>
          <p className="tech-specialization">{technician.specialization?.join(', ')}</p>
        </div>
      </div>
      
      <div className="tech-card-body">
        <div className="tech-meta">
          <div className="meta-item">
            <Star className="star-icon" size={16} fill="currentColor" />
            <span>{technician.rating} ({technician.reviewsCount})</span>
          </div>
          <div className="meta-item">
            <MapPin size={16} />
            <span>{technician.location}</span>
          </div>
          <div className="meta-item">
            <Clock size={16} />
            <span>{technician.experience} years exp.</span>
          </div>
        </div>
        <p className="tech-bio-preview">{technician.bio?.substring(0, 100)}...</p>
      </div>
      
      <div className="tech-card-footer">
        <div className="tech-price">
          <span className="price-amount">₹{technician.hourlyRate}</span>
          <span className="price-unit">/hr</span>
        </div>
        <Link to={`/technicians/${technician._id}`} className="btn btn-primary view-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default TechnicianCard;
