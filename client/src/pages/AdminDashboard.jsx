import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShieldCheck, Calendar, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        const [statsRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats', config),
          axios.get('http://localhost:5000/api/admin/bookings', config)
        ]);
        setStats(statsRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      await axios.put(`http://localhost:5000/api/admin/booking/${id}`, { status }, config);
      // Update local state
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Error updating status');
    }
  };

  if (loading) return <div className="container" style={{padding: '100px 2rem'}}>Loading Admin Panel...</div>;

  return (
    <div className="admin-dashboard container">
      <header className="admin-header">
        <h1>Admin <span className="text-blue">Control Center</span></h1>
        <p>Monitor system activity and manage service bookings.</p>
      </header>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <Users className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalUsers}</span>
              <span className="stat-label">Total Customers</span>
            </div>
          </div>
          <div className="stat-card">
            <ShieldCheck className="stat-icon icon-blue" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalTechs}</span>
              <span className="stat-label">Total Technicians</span>
            </div>
          </div>
          <div className="stat-card">
            <Calendar className="stat-icon icon-orange" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalBookings}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
          </div>
          <div className="stat-card">
            <BarChart3 className="stat-icon icon-green" />
            <div className="stat-info">
              <span className="stat-value">{stats.pendingVerifications}</span>
              <span className="stat-label">Pending Verifications</span>
            </div>
          </div>
        </div>
      )}

      <section className="admin-section">
        <h2>Recent <span className="text-blue">Bookings</span></h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Technician</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.user?.name}</td>
                  <td>{booking.technician?.user?.name}</td>
                  <td>{booking.service}</td>
                  <td>{booking.date} at {booking.slot}</td>
                  <td>
                    <span className={`status-pill ${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <div className="action-btns">
                        <button 
                          onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                          className="btn-icon approve"
                          title="Approve"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                          className="btn-icon reject"
                          title="Reject"
                        >
                          <XCircle size={20} />
                        </button>
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
  );
};

export default AdminDashboard;
