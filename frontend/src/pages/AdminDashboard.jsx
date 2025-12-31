import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-10 text-blue-400">TB Admin</h2>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded transition ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            ⚙️ Site Settings
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left p-3 rounded transition ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            📦 Products
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
            {activeTab === 'settings' ? <SettingsEditor /> : <ProductManager />}
        </div>
      </div>
    </div>
  );
}

function SettingsEditor() {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');

    const handleUpdate = async () => {
        if (!title) return setStatus('Please enter a title first.');
        
        setStatus('Updating...');
        try {
            const response = await fetch('https://techbucket-backend.onrender.com/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hero_title: title })
            });

            if (response.ok) {
                setStatus('Website updated successfully! ✅');
                setTitle(''); 
            } else {
                setStatus('Update failed. ❌');
            }
        } catch (err) {
            setStatus('Error connecting to server.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-2">Edit Home Page Content</h3>
            <p className="text-slate-500 mb-6 text-sm">This updates the main headline on the public homepage.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="e.g. Innovating Your Digital Future" 
                    />
                </div>
                <button 
                    onClick={handleUpdate}
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition w-full md:w-auto"
                >
                    Update Website
                </button>
                {status && (
                    <div className={`mt-4 p-3 rounded-md text-sm font-medium ${status.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}

function ProductManager() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch existing products
    const fetchProducts = async () => {
        try {
            const res = await fetch('https://techbucket-backend.onrender.com/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                setName('');
                setPrice('');
                fetchProducts(); // Refresh the list
            }
        } catch (err) {
            console.error("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                        className="border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input 
                        className="border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Price (e.g. Rs. 50,000)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <button 
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase">
                        <tr>
                            <th className="p-4 font-semibold">Product Name</th>
                            <th className="p-4 font-semibold">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 transition">
                                <td className="p-4 text-slate-800">{product.name}</td>
                                <td className="p-4 font-bold text-blue-600">{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && <p className="p-10 text-center text-slate-400">No products added yet.</p>}
            </div>
        </div>
    );
}
