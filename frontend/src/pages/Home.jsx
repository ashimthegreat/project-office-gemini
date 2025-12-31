import React, { useEffect, useState } from 'react';

export default function Home() {
  const [settings, setSettings] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://techbucket-backend.onrender.com/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data));

    fetch('https://techbucket-backend.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  if (!settings) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* NAVIGATION */}
      <nav className="flex justify-between items-center py-6 px-10 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-black text-blue-900 tracking-tighter">TECH<span className="text-blue-500">BUCKET</span></div>
        <div className="hidden md:flex space-x-8 font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#products" className="hover:text-blue-600 transition">Products</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
        <a href="/admin" className="text-xs bg-slate-100 px-3 py-1 rounded text-slate-400 hover:bg-slate-200">Admin Login</a>
      </nav>

      {/* HERO SECTION */}
      <header className="relative py-32 px-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 opacity-50 -z-10"></div>
        <h1 className="text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          {settings.hero_title}
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          {settings.hero_subtitle}
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition">
            Our Services
          </button>
        </div>
      </header>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Inventory</h2>
            <p className="text-slate-500 mt-2">The latest hardware and software solutions.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All →</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.length > 0 ? products.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 p-2 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition">
                <span className="text-4xl">📦</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
                <p className="text-blue-600 font-bold text-xl mt-1">{product.price}</p>
                <p className="text-slate-400 text-sm mt-2">Available in Store</p>
                <button className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Add to Cart
                </button>
              </div>
            </div>
          )) : (
            <p className="text-slate-400">No products found. Add some in the Admin panel!</p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-900 text-white py-20 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-2xl font-black mb-4">TECHBUCKET</div>
            <p className="text-slate-400">Your trusted IT partner in Nepal, providing enterprise-grade solutions since 2024.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <p className="text-slate-400">{settings.contact_email}</p>
            <p className="text-slate-400">{settings.contact_phone}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Office</h4>
            <p className="text-slate-400">Kathmandu, Nepal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
