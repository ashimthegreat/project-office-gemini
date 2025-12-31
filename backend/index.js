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

// 1. Welcome Route (Optional, but stops the "Cannot GET /" message)
app.get('/', (req, res) => {
    res.send('TechBucket API is live and running!');
});

// 2. Get Home Page Settings
app.get('/api/settings', async (req, res) => {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 3. Update Site Settings (New Admin Logic)
app.post('/api/settings', async (req, res) => {
    const { hero_title } = req.body;
    
    // We update the row where ID is 1
    const { data, error } = await supabase
        .from('site_settings')
        .update({ hero_title: hero_title })
        .eq('id', 1);

    if (error) return res.status(400).json(error);
    res.json({ message: "Settings updated successfully!" });
});

// 4. Get All Products
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 5. Post a new Product
app.post('/api/products', async (req, res) => {
    const { name, description, price, category } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, description, price, category }]);
    if (error) return res.status(400).json(error);
    res.json({ message: "Product added successfully!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
