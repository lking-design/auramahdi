// Test Supabase connection
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
}

const supabase = require('./db-supabase');

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
    console.log('Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
    
    // Test query
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      if (error.message.includes('relation "products" does not exist')) {
        console.log('\n⚠️  Tables not created yet!');
        console.log('Please run the SQL schema in Supabase SQL Editor:');
        console.log('1. Open Supabase Dashboard');
        console.log('2. Go to SQL Editor');
        console.log('3. Copy and run supabase-schema.sql');
      }
      process.exit(1);
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('✅ Database is ready');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();



