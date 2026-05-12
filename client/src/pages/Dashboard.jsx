import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User as UserIcon, CheckCircle, XCircle, AlertCircle, Zap, AirVent, Droplets } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo || { name: 'Demo User', role: 'user' });

    const fetchData = async () => {
      if (!userInfo) return;
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };

      try {
        if (userInfo.role === 'admin') {
          const [statsRes, bookingsRes] = await Promise.all([
            axios.get('http://localhost:5000/api/admin/stats', config),
            axios.get('http://localhost:5000/api/admin/bookings', config)
          ]);
          setAdminStats(statsRes.data);
          setAllBookings(bookingsRes.data);
        } else if (userInfo.role === 'technician') {
          const { data } = await axios.get('http://localhost:5000/api/bookings/tech', config);
          setBookings(data);
        } else {
          const { data } = await axios.get('http://localhost:5000/api/bookings/my', config);
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="status-confirmed" size={18} />;
      case 'pending': return <AlertCircle className="status-pending" size={18} />;
      case 'cancelled': return <XCircle className="status-cancelled" size={18} />;
      default: return null;
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      await axios.put(`http://localhost:5000/api/admin/booking/${id}`, { status }, config);
      setAllBookings(allBookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Error updating status');
    }
  };

  const handleTechStatusUpdate = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status }, config);
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Error updating status');
    }
  };

  if (loading) return <div className="container" style={{padding: '100px 2rem'}}>Loading dashboard...</div>;

  return (
    <div className="dashboard-page container">
      <div className={`dashboard-hero ${user.role}`}>
        <img 
          src={user.role === 'technician' ? 'http://localhost:5000/images/tech_dash_bg.png' : 'http://localhost:5000/images/user_dash_bg.png'} 
          alt="Dashboard Banner" 
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
        <div className="dashboard-header">
          <div className="user-welcome">
            <h1>Welcome, {user.name}</h1>
            <p>Manage your {user.role === 'technician' ? 'appointments and profile' : 'bookings and history'}.</p>
          </div>
          <div className="user-role-badge">
            {user.role.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {user.role === 'admin' ? (
          <div className="admin-merged-view">
            {adminStats && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-info">
                    <span className="stat-value">{adminStats.totalUsers}</span>
                    <span className="stat-label">Customers</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <span className="stat-value">{adminStats.totalTechs}</span>
                    <span className="stat-label">Technicians</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <span className="stat-value">{adminStats.totalBookings}</span>
                    <span className="stat-label">Bookings</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <span className="stat-value">{adminStats.pendingVerifications}</span>
                    <span className="stat-label">Pending</span>
                  </div>
                </div>
              </div>
            )}

            <section className="dashboard-section">
              <h2>Recent <span className="text-blue">Bookings</span></h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Technician</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.user?.name}</td>
                        <td>{booking.technician?.user?.name}</td>
                        <td>{booking.service}</td>
                        <td><span className={`status-pill ${booking.status}`}>{booking.status}</span></td>
                        <td>
                          {booking.status === 'pending' && (
                            <div className="action-btns">
                              <button onClick={() => handleStatusUpdate(booking._id, 'confirmed')} className="btn-icon approve">✓</button>
                              <button onClick={() => handleStatusUpdate(booking._id, 'cancelled')} className="btn-icon reject">✕</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : (
          <>
            <div className="dashboard-main-col">
              {user.role === 'technician' ? (
                <section className="dashboard-section">
                  <h2>New <span className="text-blue">Customer Bookings</span></h2>
                  <div className="bookings-list">
                    {bookings.length > 0 ? (
                      bookings.map(booking => (
                        <div key={booking._id} className={`booking-item tech-item ${booking.status}`}>
                          <div className="booking-info">
                            <div className="customer-tag">Customer</div>
                            <h3>{booking.service || 'Service Request'}</h3>
                            <p className="booking-tech">Requested by <strong>{booking.user?.name}</strong></p>
                            <div className="booking-meta">
                              <span><Calendar size={14} /> {booking.date || 'Today'}</span>
                              <span><Clock size={14} /> {booking.slot}</span>
                            </div>
                            {booking.notes && <p className="booking-notes-preview">"{booking.notes}"</p>}
                          </div>
                          <div className="booking-status-col">
                            <div className={`status-badge ${booking.status}`}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </div>
                            <span className="booking-price">₹{booking.totalAmount}</span>
                            
                            {booking.status === 'pending' && (
                              <div className="tech-action-btns">
                                <button 
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleTechStatusUpdate(booking._id, 'confirmed')}
                                >
                                  Accept Booking
                                </button>
                                <button 
                                  className="btn btn-outline btn-sm"
                                  onClick={() => handleTechStatusUpdate(booking._id, 'cancelled')}
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                            
                            {booking.status === 'confirmed' && (
                              <div className="accepted-message">
                                <CheckCircle size={16} /> I have accepted this booking
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-data">No customer requests yet. Keep your profile updated!</p>
                    )}
                  </div>
                </section>
              ) : (
                <>
                  <section className="dashboard-section">
                    <h2>Find a <span className="text-blue">Service</span></h2>
                    <div className="dashboard-services-grid">
                      <Link to="/technicians?category=Electrical Repair" className="dash-service-card">
                        <div className="dash-service-icon"><Zap size={32} /></div>
                        <span>Electrical Repair</span>
                      </Link>
                      <Link to="/technicians?category=AC Repair" className="dash-service-card">
                        <div className="dash-service-icon"><AirVent size={32} /></div>
                        <span>AC Repair</span>
                      </Link>
                      <Link to="/technicians?category=Plumbing" className="dash-service-card">
                        <div className="dash-service-icon"><Droplets size={32} /></div>
                        <span>Plumbing</span>
                      </Link>
                    </div>
                  </section>

                  <section className="dashboard-section">
                    <div className="section-header-flex">
                      <h2>Featured <span className="text-blue">Experts</span></h2>
                      <Link to="/technicians" className="view-all-link">View All Experts →</Link>
                    </div>
                    <div className="featured-techs-mini">
                      <p className="section-desc">Top-rated professionals available in your area today.</p>
                      <div className="mini-tech-grid"></div>
                    </div>
                  </section>

                  <section className="dashboard-section">
                    <h2>Upcoming Bookings</h2>
                    <div className="bookings-list">
                      {bookings.length > 0 ? (
                        bookings.map(booking => (
                          <div key={booking._id} className="booking-item">
                            <div className="booking-info">
                              <h3>{booking.service || 'Service Request'}</h3>
                              <p className="booking-tech">with {booking.technician?.user?.name}</p>
                              <div className="booking-meta">
                                <span><Calendar size={14} /> {booking.date || 'Today'}</span>
                                <span><Clock size={14} /> {booking.slot}</span>
                              </div>
                            </div>
                            <div className="booking-status-col">
                              <div className={`status-badge ${booking.status}`}>
                                {getStatusIcon(booking.status)}
                                {booking.status}
                              </div>
                              <span className="booking-price">₹{booking.totalAmount}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-data">No upcoming bookings found.</p>
                      )}
                    </div>
                  </section>
                </>
              )}
            </div>

            <aside className="dashboard-sidebar">
              <div className="stats-card">
                <div className="stat-item">
                  <span className="stat-label">{user.role === 'technician' ? 'Active Jobs' : 'Total Bookings'}</span>
                  <span className="stat-value">{user.role === 'technician' ? bookings.filter(b => b.status === 'confirmed').length : '12'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{user.role === 'technician' ? 'Pending Requests' : 'Spendings'}</span>
                  <span className="stat-value">{user.role === 'technician' ? bookings.filter(b => b.status === 'pending').length : '₹540'}</span>
                </div>
              </div>

              <div className="profile-quick-actions">
                <button className="btn btn-outline">Edit Profile</button>
                <button className="btn btn-outline">{user.role === 'technician' ? 'Manage Payouts' : 'Payment Methods'}</button>
                <button className="btn btn-primary" onClick={() => {
                  localStorage.removeItem('userInfo');
                  window.location.href = '/';
                }}>Logout</button>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
