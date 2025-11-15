// Script to add Supabase credentials to .env.local
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const supabaseConfig = `
# Supabase Configuration
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ
`;

try {
  let existingContent = '';
  
  // Read existing .env.local if it exists
  if (fs.existsSync(envPath)) {
    existingContent = fs.readFileSync(envPath, 'utf8');
    console.log('✅ Found existing .env.local file');
  } else {
    console.log('📝 Creating new .env.local file');
  }

  // Check if Supabase config already exists
  if (existingContent.includes('SUPABASE_URL')) {
    console.log('⚠️  Supabase configuration already exists in .env.local');
    console.log('   If you need to update it, please edit the file manually.');
    return;
  }

  // Append Supabase config to existing content
  const newContent = existingContent + supabaseConfig;
  fs.writeFileSync(envPath, newContent, 'utf8');
  
  console.log('✅ Successfully added Supabase credentials to .env.local');
  console.log('📝 You can now run: npm run check-env');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\nPlease manually add these lines to .env.local:');
  console.log(supabaseConfig);
}

