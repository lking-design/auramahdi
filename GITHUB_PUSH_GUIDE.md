# Guide: Push Code to GitHub

## Step 1: Install Git

If Git is not installed on your system:

1. Download Git for Windows from: https://git-scm.com/download/win
2. Run the installer and follow the setup wizard
3. **Important**: During installation, make sure to select "Git from the command line and also from 3rd-party software" option
4. Restart your terminal/PowerShell after installation

## Step 2: Verify Git Installation

Open PowerShell and run:
```powershell
git --version
```

You should see something like: `git version 2.x.x`

## Step 3: Configure Git (First Time Only)

Set your name and email:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Push to GitHub

### Option A: Use the Automated Script

After installing Git, run:
```powershell
powershell -ExecutionPolicy Bypass -File push-to-github.ps1
```

### Option B: Manual Commands

If you prefer to do it manually, run these commands one by one:

```powershell
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: ParfumeX e-commerce with Supabase integration"

# Add remote repository
git remote add origin https://github.com/lking-design/auramahdi.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Authentication

When you push, GitHub will ask for authentication. You have two options:

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` scope
3. Copy the token
4. When prompted for password, paste the token instead

### Option 2: GitHub CLI

Install GitHub CLI and authenticate:
```powershell
winget install --id GitHub.cli
gh auth login
```

## Troubleshooting

### "Repository not found" error
- Make sure the repository exists at: https://github.com/lking-design/auramahdi
- Check that you have write access to the repository

### "Authentication failed" error
- Use a Personal Access Token instead of your password
- Make sure the token has `repo` scope

### "Remote origin already exists" error
- Remove existing remote: `git remote remove origin`
- Then add it again: `git remote add origin https://github.com/lking-design/auramahdi.git`

## What Gets Pushed

The `.gitignore` file ensures these are NOT pushed:
- `node_modules/` (dependencies)
- `.env*.local` (environment variables with secrets)
- `.next/` (build files)
- Other temporary files

Your code, configuration files, and documentation will be pushed.


## Step 1: Install Git

If Git is not installed on your system:

1. Download Git for Windows from: https://git-scm.com/download/win
2. Run the installer and follow the setup wizard
3. **Important**: During installation, make sure to select "Git from the command line and also from 3rd-party software" option
4. Restart your terminal/PowerShell after installation

## Step 2: Verify Git Installation

Open PowerShell and run:
```powershell
git --version
```

You should see something like: `git version 2.x.x`

## Step 3: Configure Git (First Time Only)

Set your name and email:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Push to GitHub

### Option A: Use the Automated Script

After installing Git, run:
```powershell
powershell -ExecutionPolicy Bypass -File push-to-github.ps1
```

### Option B: Manual Commands

If you prefer to do it manually, run these commands one by one:

```powershell
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: ParfumeX e-commerce with Supabase integration"

# Add remote repository
git remote add origin https://github.com/lking-design/auramahdi.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Authentication

When you push, GitHub will ask for authentication. You have two options:

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` scope
3. Copy the token
4. When prompted for password, paste the token instead

### Option 2: GitHub CLI

Install GitHub CLI and authenticate:
```powershell
winget install --id GitHub.cli
gh auth login
```

## Troubleshooting

### "Repository not found" error
- Make sure the repository exists at: https://github.com/lking-design/auramahdi
- Check that you have write access to the repository

### "Authentication failed" error
- Use a Personal Access Token instead of your password
- Make sure the token has `repo` scope

### "Remote origin already exists" error
- Remove existing remote: `git remote remove origin`
- Then add it again: `git remote add origin https://github.com/lking-design/auramahdi.git`

## What Gets Pushed

The `.gitignore` file ensures these are NOT pushed:
- `node_modules/` (dependencies)
- `.env*.local` (environment variables with secrets)
- `.next/` (build files)
- Other temporary files

Your code, configuration files, and documentation will be pushed.

