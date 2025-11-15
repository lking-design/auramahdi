// Script to switch from MySQL to Supabase
// This will backup and replace model files

const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');

// Backup existing models
console.log('Backing up existing MySQL models...');
const models = ['User.js', 'Product.js', 'Order.js', 'CustomPerfume.js'];
models.forEach(model => {
  const filePath = path.join(modelsDir, model);
  if (fs.existsSync(filePath)) {
    const backupPath = path.join(modelsDir, `${model}.mysql-backup`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`✓ Backed up ${model}`);
  }
});

// Replace with Supabase versions
console.log('\nSwitching to Supabase models...');
models.forEach(model => {
  const supabaseModel = model.replace('.js', '-supabase.js');
  const supabasePath = path.join(modelsDir, supabaseModel);
  const targetPath = path.join(modelsDir, model);
  
  if (fs.existsSync(supabasePath)) {
    fs.copyFileSync(supabasePath, targetPath);
    console.log(`✓ Switched ${model} to Supabase`);
  }
});

// Update db.js
console.log('\nUpdating database connection...');
const dbPath = path.join(__dirname, 'db.js');
const dbSupabasePath = path.join(__dirname, 'db-supabase.js');
if (fs.existsSync(dbSupabasePath)) {
  fs.copyFileSync(dbSupabasePath, dbPath);
  console.log('✓ Updated db.js to use Supabase');
}

// Update index.js
console.log('\nUpdating server index...');
const indexPath = path.join(__dirname, 'index.js');
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  /if \(!process\.env\.DB_HOST\)/,
  'if (!process.env.SUPABASE_URL)'
);
indexContent = indexContent.replace(
  /require\('\.\/db'\)/,
  "require('./db-supabase')"
);
fs.writeFileSync(indexPath, indexContent);
console.log('✓ Updated index.js');

console.log('\n✅ Successfully switched to Supabase!');
console.log('📝 Next steps:');
console.log('1. Update .env.local with your Supabase credentials');
console.log('2. Run: npm run seed (will use Supabase seed script)');
console.log('3. Restart your server: npm run server');



