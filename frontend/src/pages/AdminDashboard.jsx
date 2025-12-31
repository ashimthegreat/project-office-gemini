import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tb_admin_access');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="mb-10 px-2">
            <h2 className="text-2xl font-black tracking-tighter text-blue-400">TB ADMIN</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Control Center</p>
          </div>
          
          <nav className="space-y-2">
            <TabButton 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
              icon="⚙️"
              label="Site Settings"
            />
            <TabButton 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
              icon="📦"
              label="Inventory"
            />
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 font-bold transition-all rounded-xl hover:bg-red-500/10"
        >
          <span>Logout</span>
          <span className="text-xs">→</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900">
              {activeTab === 'settings' ? 'Global Settings' : 'Product Management'}
            </h1>
            <p className="text-slate-500">Manage your digital presence and inventory.</p>
          </header>

          <div className="glass-card p-8 bg-white/80">
            {activeTab === 'settings' ? <SettingsEditor /> : <ProductManager />}
          </div>
        </div>
      </main>
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800 text-slate-400'
    }`}
  >
    <span>{icon}</span>
    {label}
  </button>
);

function SettingsEditor() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleUpdate = async () => {
    if (!title) return setStatus('Please enter a title.');
    setStatus('Updating...');
    try {
      const response = await fetch('https://techbucket-backend.onrender.com/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero_title: title })
      });
      if (response.ok) setStatus('Website updated successfully! ✅');
      else setStatus('Update failed. ❌');
    } catch (err) { setStatus('Error connecting to server.'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Main Hero Headline</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
          placeholder="e.g. Innovating Nepal's Tech Landscape"
        />
      </div>
      <button onClick={handleUpdate} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg">
        Update Home Page
      </button>
      {status && <p className="text-sm font-bold text-blue-600 mt-4">{status}</p>}
    </div>
  );
}

function ProductManager() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch('https://techbucket-backend.onrender.com/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) { console.error("Failed to fetch products"); }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://techbucket-backend.onrender.com/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price })
            });
            if (response.ok) {
                setName(''); setPrice('');
                fetchProducts(); 
            }
        } catch (err) { console.error("Error adding product"); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            try {
                const response = await fetch(`https://techbucket-backend.onrender.com/api/products/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) fetchProducts();
            } catch (err) { console.error("Error deleting product:", err); }
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold mb-4 text-slate-800">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input className="bg-white border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className="bg-white border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <button disabled={loading} className="bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition px-4 py-3">
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                        <tr>
                            <th className="p-4 font-semibold">Product</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 transition">
                                <td className="p-4 text-slate-800 font-medium">{product.name}</td>
                                <td className="p-4 font-bold text-blue-600">{product.price}</td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 font-bold hover:underline text-sm px-2 py-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
