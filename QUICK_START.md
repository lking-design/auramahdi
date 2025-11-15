# 🚀 Quick Start Guide

## Is the website ready to use?

**Almost!** You just need to complete these 3 steps:

### ✅ Step 1: Install Dependencies (2 minutes)
```bash
npm install
```

### ✅ Step 2: Set Up Environment (1 minute)

Create a file named `.env.local` in the root folder with:
```env
MONGODB_URI=mongodb://localhost:27017/parfumex
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note:** If you don't have MongoDB installed, you can:
- Install MongoDB locally, OR
- Use MongoDB Atlas (free cloud): https://www.mongodb.com/cloud/atlas
  - Create account → Create cluster → Get connection string → Replace `<password>`

### ✅ Step 3: Start the Servers (30 seconds)

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 🎉 Step 4: Add Sample Data (Optional)
```bash
npm run seed
```

This adds 6 sample products so you can see the website in action!

### 🌐 Access Your Website

- **Frontend:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **API:** http://localhost:3001/api/products

## ✅ Checklist

- [x] All code files created
- [x] Backend API ready
- [x] Frontend pages complete
- [x] Database models ready
- [x] Admin dashboard functional
- [x] Bilingual support (French/Arabic)
- [x] Cart & checkout system
- [ ] MongoDB connection (YOU NEED TO DO THIS)
- [ ] Environment variables (YOU NEED TO DO THIS)
- [ ] Dependencies installed (YOU NEED TO DO THIS)

## 🎯 What Works Right Now

Once you complete the steps above:

✅ Homepage with hero section  
✅ Product catalog with categories  
✅ Product detail pages  
✅ Shopping cart  
✅ Checkout system (like Kaskroutek)  
✅ Order management  
✅ Admin dashboard  
✅ Language switcher (FR/AR)  
✅ Responsive design  
✅ Favorites functionality  

## ⚠️ Important Notes

1. **MongoDB Required**: The backend needs MongoDB to store products and orders
2. **Two Servers**: You need both backend (port 3001) and frontend (port 3000) running
3. **Sample Data**: Run `npm run seed` after starting MongoDB to see products
4. **First Time Setup**: Allow 5-10 minutes for initial setup

## 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
→ Make sure MongoDB is running or your Atlas connection string is correct

**"Port already in use"**
→ Change PORT in `.env.local` to a different number (like 3002)

**"No products showing"**
→ Run `npm run seed` to add sample products

**"API errors"**
→ Make sure backend server is running on port 3001

## 📞 Need Help?

Check `SETUP.md` for detailed instructions or `README.md` for full documentation.



















