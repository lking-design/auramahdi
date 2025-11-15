const express = require('express');
const router = express.Router();
const CustomPerfume = require('../models/CustomPerfume');

// Create custom perfume
router.post('/', async (req, res) => {
  try {
    const { bottle, bottleName, perfumeType, perfumeTypeName, scent, scentName, concentration } = req.body;

    // Calculate price based on selections
    const bottlePrices = {
      'classic': 15,
      'modern': 18,
      'luxury': 25,
      'vintage': 20,
    };

    const typePrices = {
      'eau-de-parfum': 45,
      'eau-de-toilette': 35,
      'parfum': 65,
      'eau-de-cologne': 25,
    };

    const basePrice = (bottlePrices[bottle] || 15) + (typePrices[perfumeType] || 35);
    const concentrationMultiplier = 1 + (concentration / 100) * 0.5; // Up to 50% increase for higher concentration
    const totalPrice = Math.round(basePrice * concentrationMultiplier);

    const customPerfume = await CustomPerfume.create({
      bottle,
      bottleName,
      perfumeType,
      perfumeTypeName,
      scent,
      scentName,
      concentration,
      price: totalPrice,
    });

    res.status(201).json(customPerfume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all custom perfumes (for a user)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const customPerfumes = await CustomPerfume.find(query);
    res.json(customPerfumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single custom perfume
router.get('/:id', async (req, res) => {
  try {
    const customPerfume = await CustomPerfume.findById(req.params.id);
    if (!customPerfume) {
      return res.status(404).json({ error: 'Custom perfume not found' });
    }
    res.json(customPerfume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;






const CustomPerfume = require('../models/CustomPerfume');

// Create custom perfume
router.post('/', async (req, res) => {
  try {
    const { bottle, bottleName, perfumeType, perfumeTypeName, scent, scentName, concentration } = req.body;

    // Calculate price based on selections
    const bottlePrices = {
      'classic': 15,
      'modern': 18,
      'luxury': 25,
      'vintage': 20,
    };

    const typePrices = {
      'eau-de-parfum': 45,
      'eau-de-toilette': 35,
      'parfum': 65,
      'eau-de-cologne': 25,
    };

    const basePrice = (bottlePrices[bottle] || 15) + (typePrices[perfumeType] || 35);
    const concentrationMultiplier = 1 + (concentration / 100) * 0.5; // Up to 50% increase for higher concentration
    const totalPrice = Math.round(basePrice * concentrationMultiplier);

    const customPerfume = await CustomPerfume.create({
      bottle,
      bottleName,
      perfumeType,
      perfumeTypeName,
      scent,
      scentName,
      concentration,
      price: totalPrice,
    });

    res.status(201).json(customPerfume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all custom perfumes (for a user)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const customPerfumes = await CustomPerfume.find(query);
    res.json(customPerfumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single custom perfume
router.get('/:id', async (req, res) => {
  try {
    const customPerfume = await CustomPerfume.findById(req.params.id);
    if (!customPerfume) {
      return res.status(404).json({ error: 'Custom perfume not found' });
    }
    res.json(customPerfume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;





