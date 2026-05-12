import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Search, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import TechnicianCard from '../components/TechnicianCard';
import './TechnicianListing.css';

const TechnicianListing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: initialCategory,
    location: '',
    minRating: 0
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('http://localhost:5000/api/technicians', {
          params: filters
        });
        setTechnicians(data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTechnicians();
  }, [filters.category, filters.location, filters.minRating]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="listing-page container">
      <header className="listing-header">
        <h1>Find Your <span className="text-blue">Expert</span></h1>
        <p>Browse through our verified technicians and find the right one for your job.</p>
      </header>

      <div className="listing-layout">
        <aside className="filters-sidebar">
          <div className="filter-group">
            <label><Search size={18} /> Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="Electrical Repair">Electrical Repair</option>
              <option value="Plumbing">Plumbing</option>
              <option value="AC Repair">AC Repair</option>
              <option value="Computer Repair">Computer Repair</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Painting">Painting</option>
              <option value="Vehicle Repair">Vehicle Repair</option>
              <option value="Appliance Repair">Appliance Repair</option>
              <option value="Gardening">Gardening</option>
              <option value="Security Systems">Security Systems</option>
            </select>
          </div>

          <div className="filter-group">
            <label><MapPin size={18} /> Location</label>
            <input 
              type="text" 
              name="location" 
              placeholder="City, State" 
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label><Filter size={18} /> Min. Rating</label>
            <select name="minRating" value={filters.minRating} onChange={handleFilterChange}>
              <option value="0">Any Rating</option>
              <option value="4">4.0+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
        </aside>

        <main className="tech-grid-container">
          {loading ? (
            <div className="loading-spinner">Loading experts...</div>
          ) : (
            <div className="tech-grid">
              {technicians.length > 0 ? (
                technicians.map(tech => (
                  <TechnicianCard key={tech._id} technician={tech} />
                ))
              ) : (
                <div className="no-results">No technicians found matching your criteria.</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TechnicianListing;
