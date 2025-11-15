# PowerShell script to add Supabase credentials to .env.local
$envFile = ".env.local"

# Check if file exists
if (Test-Path $envFile) {
    Write-Host "Found .env.local file"
    
    # Read current content
    $content = Get-Content $envFile -Raw
    
    # Check if Supabase vars already exist
    if ($content -match "SUPABASE_URL") {
        Write-Host "⚠️  SUPABASE_URL already exists in .env.local"
        Write-Host "Please check the file manually"
    } else {
        Write-Host "Adding Supabase credentials..."
        
        # Add Supabase credentials
        $supabaseConfig = @"

# Supabase Configuration
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ

"@
        
        # Append to file
        Add-Content -Path $envFile -Value $supabaseConfig
        Write-Host "✅ Supabase credentials added to .env.local"
    }
} else {
    Write-Host "Creating new .env.local file..."
    
    $newContent = @"
# Supabase Configuration
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Server Configuration
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
"@
    
    Set-Content -Path $envFile -Value $newContent
    Write-Host "✅ Created .env.local with Supabase credentials"
}

Write-Host "`nRun: npm run check-env to verify"



$envFile = ".env.local"

# Check if file exists
if (Test-Path $envFile) {
    Write-Host "Found .env.local file"
    
    # Read current content
    $content = Get-Content $envFile -Raw
    
    # Check if Supabase vars already exist
    if ($content -match "SUPABASE_URL") {
        Write-Host "⚠️  SUPABASE_URL already exists in .env.local"
        Write-Host "Please check the file manually"
    } else {
        Write-Host "Adding Supabase credentials..."
        
        # Add Supabase credentials
        $supabaseConfig = @"

# Supabase Configuration
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ

"@
        
        # Append to file
        Add-Content -Path $envFile -Value $supabaseConfig
        Write-Host "✅ Supabase credentials added to .env.local"
    }
} else {
    Write-Host "Creating new .env.local file..."
    
    $newContent = @"
# Supabase Configuration
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Server Configuration
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
"@
    
    Set-Content -Path $envFile -Value $newContent
    Write-Host "✅ Created .env.local with Supabase credentials"
}

Write-Host "`nRun: npm run check-env to verify"



