const Order = require('./models/Order');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.DB_HOST) {
  require('dotenv').config();
}
const pool = require('./db');
const { sendOrderNotification } = require('./services/telegram');

async function createTestOrder() {
  try {
    // Test order data
    const testOrder = {
      orderNumber: `TEST-${Date.now()}`,
      user: null,
      customer: {
        name: 'Test Customer',
        address: '123 Test Street',
        city: 'Test City',
        phone: '+1234567890',
        email: 'test@example.com',
      },
      items: [
        {
          productId: 'test-1',
          name: 'Test Perfume - Classic',
          price: 75,
          quantity: 2,
          image: '',
        },
        {
          productId: 'test-2',
          name: 'Test Perfume - Modern',
          price: 85,
          quantity: 1,
          image: '',
        },
      ],
      subtotal: 235,
      shipping: 0,
      total: 235,
      paymentMethod: 'cash-on-delivery',
      status: 'pending',
    };

    // Create order in database
    const order = await Order.create(testOrder);
    console.log('✅ Test order created:', order.orderNumber);

    // Send Telegram notification
    console.log('📱 Sending Telegram notification...');
    await sendOrderNotification(order);
    console.log('✅ Telegram notification sent!');

    console.log('\n🎉 Test completed successfully!');
    console.log('Check your Telegram for the notification!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestOrder();



const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.DB_HOST) {
  require('dotenv').config();
}
const pool = require('./db');
const { sendOrderNotification } = require('./services/telegram');

async function createTestOrder() {
  try {
    // Test order data
    const testOrder = {
      orderNumber: `TEST-${Date.now()}`,
      user: null,
      customer: {
        name: 'Test Customer',
        address: '123 Test Street',
        city: 'Test City',
        phone: '+1234567890',
        email: 'test@example.com',
      },
      items: [
        {
          productId: 'test-1',
          name: 'Test Perfume - Classic',
          price: 75,
          quantity: 2,
          image: '',
        },
        {
          productId: 'test-2',
          name: 'Test Perfume - Modern',
          price: 85,
          quantity: 1,
          image: '',
        },
      ],
      subtotal: 235,
      shipping: 0,
      total: 235,
      paymentMethod: 'cash-on-delivery',
      status: 'pending',
    };

    // Create order in database
    const order = await Order.create(testOrder);
    console.log('✅ Test order created:', order.orderNumber);

    // Send Telegram notification
    console.log('📱 Sending Telegram notification...');
    await sendOrderNotification(order);
    console.log('✅ Telegram notification sent!');

    console.log('\n🎉 Test completed successfully!');
    console.log('Check your Telegram for the notification!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestOrder();



