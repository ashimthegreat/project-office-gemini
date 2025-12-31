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

// 1. Welcome Route
app.get('/', (req, res) => {
    res.send('TechBucket API is live and running!');
});

// 2. Get Home Page Settings
app.get('/api/settings', async (req, res) => {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 3. Update Site Settings
app.post('/api/settings', async (req, res) => {
    const { hero_title } = req.body;
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
    const { name, price, description, category } = req.body;
    const { data, error } = await supabase.from('products').insert([
        { 
            name, 
            price, 
            description: description || '', 
            category: category || 'General' 
        }
    ]);
    if (error) return res.status(400).json(error);
    res.json({ message: "Product added successfully!" });
});

// 6. DELETE a product (NEW)
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json(error);
    res.json({ message: "Product deleted successfully!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
