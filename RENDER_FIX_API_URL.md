# Fix: Backend Connection Issue on Render.com

## Problem
When trying to login or create an account, you see: "Cannot connect to server. Make sure the backend is running on http://localhost:3001"

## Solution

The frontend needs to know where your backend is located. You need to set the `NEXT_PUBLIC_API_URL` environment variable in your Render dashboard.

### Step 1: Find Your Backend URL

1. Go to https://dashboard.render.com
2. Find your **backend service** (the one running `npm run server`)
3. Copy the URL (it should look like: `https://parfumex-backend.onrender.com`)

### Step 2: Set Environment Variable in Frontend Service

1. Go to your **frontend service** in Render dashboard
2. Click on **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend URL (e.g., `https://parfumex-backend.onrender.com`)
5. Click **"Save Changes"**
6. This will trigger a redeploy - wait for it to complete

### Step 3: Verify Backend is Running

1. Go to your **backend service** in Render dashboard
2. Check the **"Logs"** tab
3. You should see: `Server running on port 3001`
4. If the service is stopped, click **"Manual Deploy"** → **"Deploy latest commit"**

### Step 4: Test Again

After the frontend redeploys:
1. Go to your frontend URL
2. Try to login or create an account
3. It should now connect to your backend

## Environment Variables Checklist

### Frontend Service (Next.js):
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com  ← IMPORTANT!
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your_secret_key
```

### Backend Service (Express):
```
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://cndquajnocomqjuvoxgv.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your_secret_key
TELEGRAM_BOT_TOKEN=your_token (optional)
TELEGRAM_CHAT_ID=your_chat_id (optional)
```

## Troubleshooting

### Still seeing the error?
1. **Check backend is running**: Go to backend service → Logs tab
2. **Check environment variable**: Make sure `NEXT_PUBLIC_API_URL` is set correctly
3. **Check backend URL**: Try opening `https://your-backend-url.onrender.com/api/products` in browser - should return JSON
4. **Wait for redeploy**: After changing environment variables, wait for the redeploy to complete

### Backend URL not working?
- Make sure backend service is deployed and running
- Check backend logs for errors
- Verify the backend URL is correct (no typos)


