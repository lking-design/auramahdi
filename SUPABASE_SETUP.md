# 🚀 Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: parfumex (or any name you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait for project to be created (2-3 minutes)

## Step 2: Run SQL Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

## Step 4: Update .env.local

Open `.env.local` and replace the MySQL settings with:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Keep these
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Important:**
- Use `SUPABASE_SERVICE_ROLE_KEY` for backend operations (bypasses RLS)
- Use `SUPABASE_ANON_KEY` for frontend if needed
- Never commit `.env.local` to git!

## Step 5: Switch Models

After you provide the API keys, I'll help you:
1. Rename the model files to use Supabase versions
2. Update all routes
3. Test the connection

## Step 6: Seed Database (Optional)

After setup, you can seed products:
```bash
npm run seed
```

## 🔐 Security Notes

- **Service Role Key**: Has full access, use only in backend
- **Anon Key**: Public, safe for frontend (with Row Level Security)
- Keep your keys secure and never expose service_role key

## ✅ What's Different from MySQL

- Uses UUID instead of auto-increment IDs
- Uses JSONB for arrays/objects (better performance)
- Automatic timestamps with triggers
- Better scalability and built-in auth options

## 📝 Next Steps

1. Create Supabase project
2. Run the SQL schema
3. Get your API keys
4. Share the keys with me (I'll update the code)
5. Test the connection




## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: parfumex (or any name you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait for project to be created (2-3 minutes)

## Step 2: Run SQL Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

## Step 4: Update .env.local

Open `.env.local` and replace the MySQL settings with:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Keep these
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Important:**
- Use `SUPABASE_SERVICE_ROLE_KEY` for backend operations (bypasses RLS)
- Use `SUPABASE_ANON_KEY` for frontend if needed
- Never commit `.env.local` to git!

## Step 5: Switch Models

After you provide the API keys, I'll help you:
1. Rename the model files to use Supabase versions
2. Update all routes
3. Test the connection

## Step 6: Seed Database (Optional)

After setup, you can seed products:
```bash
npm run seed
```

## 🔐 Security Notes

- **Service Role Key**: Has full access, use only in backend
- **Anon Key**: Public, safe for frontend (with Row Level Security)
- Keep your keys secure and never expose service_role key

## ✅ What's Different from MySQL

- Uses UUID instead of auto-increment IDs
- Uses JSONB for arrays/objects (better performance)
- Automatic timestamps with triggers
- Better scalability and built-in auth options

## 📝 Next Steps

1. Create Supabase project
2. Run the SQL schema
3. Get your API keys
4. Share the keys with me (I'll update the code)
5. Test the connection



