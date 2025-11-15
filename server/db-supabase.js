const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
}

// Validate required environment variables
if (!process.env.SUPABASE_URL) {
  console.error('❌ SUPABASE_URL is missing in .env.local');
  console.error('Please add: SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co');
  throw new Error('SUPABASE_URL is required. Please check your .env.local file.');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_ANON_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY is missing in .env.local');
  throw new Error('Supabase API key is required. Please check your .env.local file.');
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

// Test connection
supabase.from('products').select('count').limit(1)
  .then(() => {
    console.log('Supabase connected');
  })
  .catch((err) => {
    console.error('Supabase connection error:', err.message);
  });

module.exports = supabase;

