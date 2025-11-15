const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });
if (!process.env.TELEGRAM_BOT_TOKEN) {
  require('dotenv').config();
}

let bot = null;

// Initialize bot if token is provided
if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
}

/**
 * Send order notification to Telegram
 * @param {Object} order - Order object
 */
async function sendOrderNotification(order) {
  if (!bot || !process.env.TELEGRAM_CHAT_ID) {
    console.log('Telegram bot not configured. Skipping notification.');
    return;
  }

  try {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    // Format order message
    const message = formatOrderMessage(order);
    
    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    console.log('Telegram notification sent successfully');
  } catch (error) {
    console.error('Error sending Telegram notification:', error.message);
    // Don't throw error - we don't want to break order creation if Telegram fails
  }
}

/**
 * Format order message for Telegram
 */
function formatOrderMessage(order) {
  const itemsList = order.items.map((item, index) => {
    return `${index + 1}. ${item.name} - ${item.quantity}x (${(item.price * item.quantity).toFixed(2)} TND)`;
  }).join('\n');

  const customerInfo = order.customer.email 
    ? `📧 Email: ${order.customer.email}\n`
    : '';

  const userInfo = order.user 
    ? `👤 User ID: ${order.user}\n`
    : '👤 Guest Order\n';

  return `
🛒 <b>New Order Received!</b>

📦 Order Number: <code>${order.orderNumber}</code>
${userInfo}${customerInfo}
👤 Customer: ${order.customer.name}
📞 Phone: ${order.customer.phone}
📍 Address: ${order.customer.address}, ${order.customer.city}

🛍️ <b>Items:</b>
${itemsList}

💰 Subtotal: ${order.subtotal.toFixed(2)} TND
🚚 Shipping: ${order.shipping.toFixed(2)} TND
💵 <b>Total: ${order.total.toFixed(2)} TND</b>

💳 Payment: ${order.paymentMethod === 'cash-on-delivery' ? 'Cash on Delivery' : 'Card'}
📊 Status: ${order.status}

⏰ ${new Date(order.createdAt).toLocaleString()}
  `.trim();
}

/**
 * Send test message to verify bot setup
 */
async function sendTestMessage() {
  if (!bot || !process.env.TELEGRAM_CHAT_ID) {
    throw new Error('Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local');
  }

  try {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    await bot.sendMessage(chatId, '✅ Telegram bot is working! You will receive notifications for new orders.');
    console.log('Test message sent successfully!');
  } catch (error) {
    throw new Error(`Failed to send test message: ${error.message}`);
  }
}

module.exports = {
  sendOrderNotification,
  sendTestMessage,
};





