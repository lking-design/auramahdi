// Quick script to check if environment variables are loaded
const path = require('path');
const fs = require('fs');

// Try loading .env.local
const envPath = path.resolve(__dirname, '.env.local');
console.log('Looking for .env.local at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('\nFile content preview (first 500 chars):');
  console.log(envContent.substring(0, 500));
  console.log('\n---\n');
}

require('dotenv').config({ path: envPath });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
}

console.log('Environment Variables Check:');
console.log('============================');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Found' : '❌ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Found' : '❌ Missing');

if (!process.env.SUPABASE_URL) {
  console.log('\n❌ SUPABASE_URL is missing!');
  console.log('\nPlease add to .env.local:');
  console.log('SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co');
  console.log('SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI');
  console.log('SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ');
  process.exit(1);
}

console.log('\n✅ All environment variables are set!');

