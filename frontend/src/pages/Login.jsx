import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'TechBucket2025') {
      localStorage.setItem('tb_admin_access', 'true');
      navigate('/admin'); // Redirect to dashboard
    } else {
      alert('Access Denied: Wrong Password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="glass-card p-12 w-full max-w-md text-center">
        <h1 className="text-3xl font-black text-blue-900 mb-2">TB ADMIN</h1>
        <p className="text-slate-500 mb-8">Enter credentials to manage TechBucket</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg">
            Unlock System
          </button>
        </form>
      </div>
    </div>
  );
}
