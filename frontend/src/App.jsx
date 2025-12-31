import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

// 1. IMPORT REAL PAGES FROM YOUR PAGES FOLDER
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import Contact from './pages/Contact';
import About from './pages/About'; // Make sure this file exists
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// 2. PROTECTED ROUTE LOGIC
// This prevents anyone from seeing the AdminDashboard unless they have the "tb_admin_access" key
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('tb_admin_access') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// 3. NAVBAR COMPONENT
const Navbar = () => (
  <nav className="glass-nav px-6 py-4 flex justify-between items-center">
    <div className="text-2xl font-black tracking-tighter text-blue-900">TECHBUCKET</div>
    <div className="space-x-8 font-semibold text-slate-600 hidden md:flex">
      <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-400 transition"}>Home</NavLink>
      <NavLink to="/services" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-400 transition"}>Services</NavLink>
      <NavLink to="/events" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-400 transition"}>Events</NavLink>
      <NavLink to="/contact" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-400 transition"}>Contact</NavLink>
    </div>
    <NavLink to="/admin" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition">
      Admin Panel
    </NavLink>
  </nav>
);

// 4. MAIN APP COMPONENT
export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback to Home if route doesn't exist */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
