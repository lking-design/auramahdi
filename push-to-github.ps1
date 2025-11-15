# PowerShell script to push code to GitHub
# Make sure Git is installed first: https://git-scm.com/download/win

Write-Host "Checking Git installation..." -ForegroundColor Yellow

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "`nInitializing Git repository..." -ForegroundColor Yellow

# Initialize git if not already initialized
if (-not (Test-Path .git)) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

Write-Host "`nAdding all files..." -ForegroundColor Yellow
git add .

Write-Host "`nChecking if there are changes to commit..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: ParfumeX e-commerce with Supabase integration"
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "⚠️  No changes to commit" -ForegroundColor Yellow
}

Write-Host "`nSetting up remote repository..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/lking-design/auramahdi.git"

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    if ($existingRemote -ne $remoteUrl) {
        Write-Host "Updating remote URL..." -ForegroundColor Yellow
        git remote set-url origin $remoteUrl
    } else {
        Write-Host "✅ Remote already configured correctly" -ForegroundColor Green
    }
} else {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $remoteUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
}

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You may be prompted for GitHub credentials" -ForegroundColor Cyan

# Try to push
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: $remoteUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "1. Authentication required - use GitHub Personal Access Token" -ForegroundColor Yellow
    Write-Host "2. Repository might not exist or you don't have access" -ForegroundColor Yellow
    Write-Host "3. Check your internet connection" -ForegroundColor Yellow
}

# Make sure Git is installed first: https://git-scm.com/download/win

Write-Host "Checking Git installation..." -ForegroundColor Yellow

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "`nInitializing Git repository..." -ForegroundColor Yellow

# Initialize git if not already initialized
if (-not (Test-Path .git)) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

Write-Host "`nAdding all files..." -ForegroundColor Yellow
git add .

Write-Host "`nChecking if there are changes to commit..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: ParfumeX e-commerce with Supabase integration"
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "⚠️  No changes to commit" -ForegroundColor Yellow
}

Write-Host "`nSetting up remote repository..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/lking-design/auramahdi.git"

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    if ($existingRemote -ne $remoteUrl) {
        Write-Host "Updating remote URL..." -ForegroundColor Yellow
        git remote set-url origin $remoteUrl
    } else {
        Write-Host "✅ Remote already configured correctly" -ForegroundColor Green
    }
} else {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $remoteUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
}

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You may be prompted for GitHub credentials" -ForegroundColor Cyan

# Try to push
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: $remoteUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "1. Authentication required - use GitHub Personal Access Token" -ForegroundColor Yellow
    Write-Host "2. Repository might not exist or you don't have access" -ForegroundColor Yellow
    Write-Host "3. Check your internet connection" -ForegroundColor Yellow
}

