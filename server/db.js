const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
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



const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
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



