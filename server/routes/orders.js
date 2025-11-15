const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { optionalAuth } = require('../middleware/auth');
const { sendOrderNotification } = require('../services/telegram');

// Create order
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    // Validation
    if (!customer || !customer.name || !customer.address || !customer.city || !customer.phone) {
      return res.status(400).json({ error: 'Missing required customer information' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ error: 'Payment method is required' });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = await Promise.all(
      items.map(async (item) => {
        // Priority: Use item data if available (for custom perfumes or already processed items)
        if (item.name && item.price !== undefined) {
          const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
          subtotal += itemTotal;
          return {
            productId: item.productId || 'custom',
            name: item.name,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
            image: item.image || '',
          };
        }
        
        // Try to find product in database only if we don't have item data
        try {
          const productId = parseInt(item.productId) || item.productId;
          const product = await Product.findById(productId);
          
          if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            return {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
              image: product.images && product.images.length > 0 ? product.images[0] : '',
            };
          }
        } catch (err) {
          console.error(`Error finding product ${item.productId}:`, err.message);
        }
        
        // Fallback: Use item data even if incomplete
        if (item.name) {
          const itemPrice = item.price || 0;
          const itemQty = item.quantity || 1;
          const itemTotal = itemPrice * itemQty;
          subtotal += itemTotal;
          return {
            productId: item.productId || 'unknown',
            name: item.name,
            price: itemPrice,
            quantity: itemQty,
            image: item.image || '',
          };
        }
        
        // Last resort: throw error
        throw new Error(`Product ${item.productId} not found and no item data available`);
      })
    );

    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over 100
    const total = subtotal + shipping;

    const order = await Order.create({
      user: req.user ? req.user.id : null,
      customer,
      items: orderItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
    });

    // Send Telegram notification (don't fail if this fails)
    sendOrderNotification(order).catch(err => {
      console.error('Telegram notification failed:', err.message);
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user's orders (protected)
router.get('/my-orders', require('../middleware/auth').auth, async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findByOrderNumber(req.params.orderNumber);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;








