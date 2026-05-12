import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Clock, Calendar, MessageSquare } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import './TechnicianProfile.css';

const TechnicianProfile = () => {
  const { id } = useParams();
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/technicians/${id}`);
        setTechnician(data);
      } catch (error) {
        console.error('Error fetching technician:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTechnician();
  }, [id]);

  if (loading) return <div className="container" style={{padding: '100px 2rem'}}>Loading profile...</div>;
  if (!technician) return <div className="container" style={{padding: '100px 2rem'}}>Technician not found.</div>;

  return (
    <div className="profile-page container">
      <div className="profile-layout">
        <div className="profile-main">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {technician.image ? (
                <img src={`http://localhost:5000${technician.image}`} alt={technician.user?.name} className="profile-img" />
              ) : (
                technician.user?.name?.charAt(0) || 'T'
              )}
            </div>
            <div className="profile-info-large">
              <div className="profile-name-row">
                <h1>{technician.user.name}</h1>
                {technician.isVerified && <ShieldCheck className="verified-icon" size={24} />}
              </div>
              <p className="profile-specialization">{technician.specialization.join(', ')}</p>
              
              <div className="profile-meta-row">
                <div className="meta-item">
                  <Star className="star-icon" size={18} fill="currentColor" />
                  <span>{technician.rating} ({technician.reviewsCount} reviews)</span>
                </div>
                <div className="meta-item">
                  <MapPin size={18} />
                  <span>{technician.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>About Me</h2>
            <p>{technician.bio}</p>
          </div>

          <div className="profile-section">
            <h2>Expertise & Skills</h2>
            <div className="skills-grid">
              {technician.specialization.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              <span className="skill-tag">Hardware Diagnostics</span>
              <span className="skill-tag">OS Installation</span>
              <span className="skill-tag">Data Recovery</span>
            </div>
          </div>

          <div className="profile-section">
            <h2>Reviews</h2>
            <div className="reviews-list">
              <div className="review-item">
                <div className="review-header">
                  <strong>Sarah Miller</strong>
                  <div className="review-rating"><Star size={14} fill="currentColor" /> 5.0</div>
                </div>
                <p>"Alex fixed my broken laptop screen in just 2 hours. Very professional and highly recommended!"</p>
                <span className="review-date">2 days ago</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="profile-sidebar">
          <div className="booking-card">
            <div className="booking-price">
              <span className="price">₹{technician.hourlyRate}</span>
              <span className="unit">/hour</span>
            </div>
            <div className="booking-stats">
              <div className="stat">
                <Clock size={18} />
                <span>{technician.experience} yrs experience</span>
              </div>
              <div className="stat">
                <Calendar size={18} />
                <span>Available Today</span>
              </div>
            </div>
            <button className="btn btn-primary book-now-btn" onClick={() => setIsModalOpen(true)}>
              Book Appointment
            </button>
            <p className="booking-note">No charge until service is completed.</p>
          </div>

          <button className="btn btn-outline contact-btn">
            <MessageSquare size={18} />
            Message Technician
          </button>
        </aside>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        technician={technician}
      />
    </div>
  );
};

export default TechnicianProfile;
