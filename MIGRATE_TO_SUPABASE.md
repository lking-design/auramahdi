# 🔄 Migration Guide: MySQL → Supabase

## Quick Migration Steps

### Step 1: Create Supabase Project
1. Go to https://supabase.com and create account
2. Create new project
3. Wait for setup to complete

### Step 2: Run SQL Schema
1. Open Supabase Dashboard → SQL Editor
2. Copy entire `supabase-schema.sql` file
3. Paste and Run in SQL Editor
4. Verify tables are created (check Table Editor)

### Step 3: Get API Keys
From Supabase Dashboard → Settings → API:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon key**: `eyJhbGc...` (public key)
- **service_role key**: `eyJhbGc...` (secret - backend only!)

### Step 4: Update .env.local
Replace MySQL settings with:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Step 5: Switch to Supabase
```bash
npm run switch-supabase
```

This will:
- Backup your MySQL models
- Replace with Supabase models
- Update database connection

### Step 6: Seed Database
```bash
npm run seed-supabase
```

### Step 7: Restart Server
```bash
npm run server
```

## ✅ Verification

Check server console for:
```
Supabase connected
Server running on port 3001
```

## 🔄 Rollback (if needed)

Your MySQL models are backed up as:
- `User.js.mysql-backup`
- `Product.js.mysql-backup`
- `Order.js.mysql-backup`
- `CustomPerfume.js.mysql-backup`

To rollback, just restore these files.

## 📊 Differences

| Feature | MySQL | Supabase |
|---------|-------|----------|
| IDs | Auto-increment INT | UUID |
| Arrays | JSON column | JSONB (native) |
| Timestamps | Manual | Auto with triggers |
| Scalability | Manual | Built-in |
| Auth | Custom | Built-in (optional) |

## 🎯 Benefits of Supabase

- ✅ Free tier (500MB database, 2GB bandwidth)
- ✅ Auto-scaling
- ✅ Built-in real-time subscriptions
- ✅ Better JSON support
- ✅ Row Level Security (RLS)
- ✅ Automatic backups
- ✅ Web dashboard for data management




## Quick Migration Steps

### Step 1: Create Supabase Project
1. Go to https://supabase.com and create account
2. Create new project
3. Wait for setup to complete

### Step 2: Run SQL Schema
1. Open Supabase Dashboard → SQL Editor
2. Copy entire `supabase-schema.sql` file
3. Paste and Run in SQL Editor
4. Verify tables are created (check Table Editor)

### Step 3: Get API Keys
From Supabase Dashboard → Settings → API:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon key**: `eyJhbGc...` (public key)
- **service_role key**: `eyJhbGc...` (secret - backend only!)

### Step 4: Update .env.local
Replace MySQL settings with:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Step 5: Switch to Supabase
```bash
npm run switch-supabase
```

This will:
- Backup your MySQL models
- Replace with Supabase models
- Update database connection

### Step 6: Seed Database
```bash
npm run seed-supabase
```

### Step 7: Restart Server
```bash
npm run server
```

## ✅ Verification

Check server console for:
```
Supabase connected
Server running on port 3001
```

## 🔄 Rollback (if needed)

Your MySQL models are backed up as:
- `User.js.mysql-backup`
- `Product.js.mysql-backup`
- `Order.js.mysql-backup`
- `CustomPerfume.js.mysql-backup`

To rollback, just restore these files.

## 📊 Differences

| Feature | MySQL | Supabase |
|---------|-------|----------|
| IDs | Auto-increment INT | UUID |
| Arrays | JSON column | JSONB (native) |
| Timestamps | Manual | Auto with triggers |
| Scalability | Manual | Built-in |
| Auth | Custom | Built-in (optional) |

## 🎯 Benefits of Supabase

- ✅ Free tier (500MB database, 2GB bandwidth)
- ✅ Auto-scaling
- ✅ Built-in real-time subscriptions
- ✅ Better JSON support
- ✅ Row Level Security (RLS)
- ✅ Automatic backups
- ✅ Web dashboard for data management



