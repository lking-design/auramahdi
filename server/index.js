const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
// Fallback to .env if .env.local doesn't exist
if (!process.env.SUPABASE_URL && !process.env.DB_HOST) {
  require('dotenv').config();
}

// Initialize database connection (auto-detect Supabase or MySQL)
if (process.env.SUPABASE_URL) {
  require('./db-supabase');
  console.log('Using Supabase database');
} else {
  require('./db-supabase');
  console.log('Using MySQL database');
}

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow requests from any origin
// In production, we allow all origins since we use JWT tokens for authentication
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/custom-perfumes', require('./routes/customPerfumes'));
app.use('/api/telegram', require('./routes/telegram'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
