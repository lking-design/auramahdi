const express = require('express');
const router = express.Router();
const { sendTestMessage } = require('../services/telegram');

// Test Telegram bot connection
router.post('/test', async (req, res) => {
  try {
    await sendTestMessage();
    res.json({ success: true, message: 'Test message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;





