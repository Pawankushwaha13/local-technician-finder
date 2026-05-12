import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import TechnicianListing from './pages/TechnicianListing';
import TechnicianProfile from './pages/TechnicianProfile';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Auth type="login" />} />
            <Route path="/register" element={<Auth type="register" />} />
            <Route path="/technicians" element={<TechnicianListing />} />
            <Route path="/technicians/:id" element={<TechnicianProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
