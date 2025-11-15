# 🚀 Render.com Deployment Guide

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Supabase Project**: Set up and configured
3. **Render Account**: Sign up at https://render.com

## Step 1: Deploy Frontend (Next.js)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `lking-design/auramahdi`
4. Configure the service:
   - **Name**: `parfumex-frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is fine for testing

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://parfumex-backend.onrender.com
   SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   ```

6. Click **"Create Web Service"**

## Step 2: Deploy Backend (Express API)

1. Click **"New +"** → **"Web Service"**
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `parfumex-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Instance Type**: Free tier

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token (optional)
   TELEGRAM_CHAT_ID=your_telegram_chat_id (optional)
   ```

5. Click **"Create Web Service"**

## Step 3: Update Frontend API URL

After the backend is deployed, update the frontend's `NEXT_PUBLIC_API_URL`:
1. Go to your frontend service in Render
2. Go to **Environment** tab
3. Update `NEXT_PUBLIC_API_URL` to your backend URL (e.g., `https://parfumex-backend.onrender.com`)
4. Click **"Save Changes"** - this will trigger a redeploy

## Step 4: Enable Auto-Deploy

1. In both services, go to **Settings**
2. Enable **"Auto-Deploy"** so changes push to GitHub automatically deploy

## Important Notes

### Security
- **Never commit** `.env.local` to GitHub
- Use Render's environment variables for secrets
- Change `JWT_SECRET` to a strong random string in production

### CORS
- The backend should allow requests from your frontend domain
- Check `server/index.js` for CORS configuration

### Database
- Make sure your Supabase database is accessible from Render
- Run the SQL schema in Supabase if you haven't already
- Seed the database: `npm run seed-supabase` (run locally or via Render shell)

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down may be slow (cold start)
- Consider upgrading for production use

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` points to correct backend URL
- Check CORS settings in backend
- Ensure backend service is running

### Database Connection Issues
- Verify Supabase credentials are correct
- Check Supabase project is active
- Ensure database tables are created

## Testing

After deployment:
1. Visit your frontend URL
2. Test registration/login
3. Test adding items to cart
4. Test checkout process
5. Check backend logs for any errors


## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Supabase Project**: Set up and configured
3. **Render Account**: Sign up at https://render.com

## Step 1: Deploy Frontend (Next.js)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `lking-design/auramahdi`
4. Configure the service:
   - **Name**: `parfumex-frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is fine for testing

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://parfumex-backend.onrender.com
   SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNTAxNzcsImV4cCI6MjA3ODcyNjE3N30.RXk3MCeLc9HwPoycsWs897us7IS1qeRluAU61ZuQdtI
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   ```

6. Click **"Create Web Service"**

## Step 2: Deploy Backend (Express API)

1. Click **"New +"** → **"Web Service"**
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `parfumex-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Instance Type**: Free tier

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHF1YWpub2NvbXFqdXZveGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MDE3NywiZXhwIjoyMDc4NzI2MTc3fQ.7M9xbW7KsjiBEASsVb5b4bMR_L9XiOsU74NajMiJpuQ
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token (optional)
   TELEGRAM_CHAT_ID=your_telegram_chat_id (optional)
   ```

5. Click **"Create Web Service"**

## Step 3: Update Frontend API URL

After the backend is deployed, update the frontend's `NEXT_PUBLIC_API_URL`:
1. Go to your frontend service in Render
2. Go to **Environment** tab
3. Update `NEXT_PUBLIC_API_URL` to your backend URL (e.g., `https://parfumex-backend.onrender.com`)
4. Click **"Save Changes"** - this will trigger a redeploy

## Step 4: Enable Auto-Deploy

1. In both services, go to **Settings**
2. Enable **"Auto-Deploy"** so changes push to GitHub automatically deploy

## Important Notes

### Security
- **Never commit** `.env.local` to GitHub
- Use Render's environment variables for secrets
- Change `JWT_SECRET` to a strong random string in production

### CORS
- The backend should allow requests from your frontend domain
- Check `server/index.js` for CORS configuration

### Database
- Make sure your Supabase database is accessible from Render
- Run the SQL schema in Supabase if you haven't already
- Seed the database: `npm run seed-supabase` (run locally or via Render shell)

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down may be slow (cold start)
- Consider upgrading for production use

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` points to correct backend URL
- Check CORS settings in backend
- Ensure backend service is running

### Database Connection Issues
- Verify Supabase credentials are correct
- Check Supabase project is active
- Ensure database tables are created

## Testing

After deployment:
1. Visit your frontend URL
2. Test registration/login
3. Test adding items to cart
4. Test checkout process
5. Check backend logs for any errors

