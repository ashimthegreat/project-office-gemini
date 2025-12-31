const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// --- ROUTES ---

// 1. Get Home Page Settings
app.get('/api/settings', async (req, res) => {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 2. Get All Products
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 3. Post a new Product (Phase 2 Admin logic)
app.post('/api/products', async (req, res) => {
    const { name, description, price, category } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, description, price, category }]);
    if (error) return res.status(400).json(error);
    res.json({ message: "Product added successfully!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
