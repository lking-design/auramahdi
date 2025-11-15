# 🚀 Setup Instructions - ParfumeX E-commerce (MySQL/XAMPP)

## Quick Setup Guide

Follow these steps to get your e-commerce website running with MySQL (XAMPP), authentication, cart, and checkout functionality.

### Step 1: Start XAMPP MySQL

1. Open XAMPP Control Panel
2. Start **MySQL** service
3. Make sure MySQL is running (green indicator)

**Default MySQL settings:**
- Host: `localhost`
- User: `root`
- Password: (usually empty/blank)
- Port: `3306`

### Step 2: Create Environment File

The `.env.local` file has been created with default MySQL settings. If you need to change it, edit `.env.local`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=parfumex
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note:** If your MySQL has a password, update `DB_PASSWORD` in `.env.local`

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Initialize Database

This will create the database and all necessary tables:

```bash
npm run init-db
```

You should see:
```
Database 'parfumex' ready
Users table created
Products table created
Orders table created
Custom perfumes table created
Database initialization completed!
```

### Step 5: Seed the Database (Optional but Recommended)

This will add sample products to your database:

```bash
npm run seed
```

You should see:
```
Connected to MySQL
Cleared existing products
Inserted 6 products
```

### Step 6: Start the Servers

You need to run TWO terminals:

**Terminal 1 - Backend Server:**
```bash
npm run server
```

You should see:
```
MySQL connected
Server running on port 3001
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```

You should see:
```
Ready on http://localhost:3000
```

### Step 7: Access Your Website

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Login Page:** http://localhost:3000/login
- **Register Page:** http://localhost:3000/register
- **Admin Dashboard:** http://localhost:3000/admin

## ✅ Features Now Available

### Authentication
- ✅ User Registration (`/register`)
- ✅ User Login (`/login`)
- ✅ User Logout (button in header)
- ✅ Protected routes
- ✅ User profile page (`/profile`)
- ✅ JWT token-based authentication

### Shopping Features
- ✅ Browse products
- ✅ Add to cart
- ✅ View cart (`/cart`)
- ✅ Checkout (`/checkout`)
- ✅ Place orders
- ✅ View order history (for logged-in users)
- ✅ Guest checkout (no login required)

### Admin Features
- ✅ Admin dashboard (`/admin`)
- ✅ Manage products
- ✅ View and manage orders

## 🎯 Testing the Features

1. **Register a new account:**
   - Go to http://localhost:3000/register
   - Fill in the form and create an account

2. **Login:**
   - Go to http://localhost:3000/login
   - Use your credentials to login

3. **Add products to cart:**
   - Browse products at http://localhost:3000/shop
   - Click "Add to Cart" on any product

4. **Checkout:**
   - Go to http://localhost:3000/cart
   - Click "Proceed to Checkout"
   - Fill in shipping details (or they'll be pre-filled if logged in)
   - Place your order

5. **View profile:**
   - Click the user icon in the header
   - Update your profile information

## 🔧 Troubleshooting

### "Cannot connect to MySQL"
- Make sure XAMPP MySQL is running (green in XAMPP Control Panel)
- Check your `DB_HOST`, `DB_USER`, and `DB_PASSWORD` in `.env.local`
- Try accessing phpMyAdmin at http://localhost/phpmyadmin to verify MySQL is working

### "Access denied for user"
- Check your MySQL username and password in `.env.local`
- Default XAMPP MySQL user is `root` with no password
- If you set a password, update `DB_PASSWORD` in `.env.local`

### "Port already in use"
- Change the `PORT` in `.env.local` to a different number (e.g., 3002)
- Make sure no other application is using port 3000 or 3001

### "No products showing"
- Run `npm run seed` to add sample products
- Check that the database was initialized with `npm run init-db`

### "Database doesn't exist"
- Run `npm run init-db` to create the database and tables
- Make sure MySQL is running in XAMPP

### "API errors"
- Make sure the backend server is running (`npm run server`)
- Check that `NEXT_PUBLIC_API_URL` matches your backend URL
- Check browser console for detailed error messages

## 📝 Database Structure

The application uses the following MySQL tables:

- **users** - User accounts with authentication
- **products** - Product catalog
- **orders** - Customer orders (linked to users if logged in)
- **custom_perfumes** - Custom perfume configurations

You can view and manage your database using phpMyAdmin:
- Open http://localhost/phpmyadmin
- Select the `parfumex` database

## 🔐 Security Notes

- Change `JWT_SECRET` to a strong random string in production
- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Consider using HTTPS in production
- Set a strong MySQL password for production

## 🎉 You're All Set!

Your e-commerce website is now ready with full authentication, cart, and checkout functionality using MySQL!

## 📋 Quick Command Reference

```bash
# Initialize database (first time only)
npm run init-db

# Add sample products
npm run seed

# Start backend server
npm run server

# Start frontend server
npm run dev
```
