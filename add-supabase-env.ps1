# PowerShell script to add Supabase credentials to .env.local

$envFile = ".env.local"
$supabaseUrl = "SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co"
$supabaseAnonKey = "SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI"
$supabaseServiceKey = "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ"

Write-Host "Adding Supabase credentials to .env.local..." -ForegroundColor Yellow

# Check if file exists
if (Test-Path $envFile) {
    Write-Host "Found existing .env.local file" -ForegroundColor Green
    
    # Read existing content
    $content = Get-Content $envFile -Raw
    
    # Check if Supabase variables already exist
    if ($content -match "SUPABASE_URL") {
        Write-Host "⚠️  SUPABASE_URL already exists. Updating..." -ForegroundColor Yellow
        $content = $content -replace "SUPABASE_URL=.*", $supabaseUrl
    } else {
        Write-Host "Adding SUPABASE_URL..." -ForegroundColor Green
        $content += "`n$supabaseUrl"
    }
    
    if ($content -match "SUPABASE_ANON_KEY") {
        Write-Host "⚠️  SUPABASE_ANON_KEY already exists. Updating..." -ForegroundColor Yellow
        $content = $content -replace "SUPABASE_ANON_KEY=.*", $supabaseAnonKey
    } else {
        Write-Host "Adding SUPABASE_ANON_KEY..." -ForegroundColor Green
        $content += "`n$supabaseAnonKey"
    }
    
    if ($content -match "SUPABASE_SERVICE_ROLE_KEY") {
        Write-Host "⚠️  SUPABASE_SERVICE_ROLE_KEY already exists. Updating..." -ForegroundColor Yellow
        $content = $content -replace "SUPABASE_SERVICE_ROLE_KEY=.*", $supabaseServiceKey
    } else {
        Write-Host "Adding SUPABASE_SERVICE_ROLE_KEY..." -ForegroundColor Green
        $content += "`n$supabaseServiceKey"
    }
    
    # Write back to file
    $content | Set-Content $envFile -NoNewline
} else {
    Write-Host "Creating new .env.local file..." -ForegroundColor Green
    # Create new file with Supabase credentials
    @"
$supabaseUrl
$supabaseAnonKey
$supabaseServiceKey
"@ | Set-Content $envFile
}

Write-Host "`n✅ Done! Supabase credentials added to .env.local" -ForegroundColor Green
Write-Host "`nRun: npm run check-env to verify" -ForegroundColor Cyan

