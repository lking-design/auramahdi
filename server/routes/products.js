const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) query.search = search;

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get related products
router.get('/:id/related', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
    });
    
    // Filter out current product and limit to 4
    const filtered = relatedProducts
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;








