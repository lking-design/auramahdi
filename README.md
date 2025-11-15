# ParfumeX - Luxury Perfume E-commerce Website

A modern, elegant e-commerce website for selling perfumes, perfume gift boxes, and fragrance accessories, inspired by Kaskroutek's checkout design.

## Features

- 🌐 **Bilingual Support**: French and Arabic language switching
- 🛍️ **Full E-commerce**: Product catalog, cart, checkout system
- 💳 **Payment Options**: Cash on delivery and card payment
- 🎨 **Modern UI**: Luxury brand aesthetic with minimalist design
- 📱 **Responsive**: Works seamlessly on mobile and desktop
- ⚡ **Fast Performance**: Built with Next.js 14 and React
- 🗄️ **Backend API**: Node.js + Express + MongoDB
- 👤 **Admin Dashboard**: Manage products and orders

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas connection string)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd parfum
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/parfumex
JWT_SECRET=your_jwt_secret_key_here
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the backend server:
```bash
npm run server
```

5. Start the frontend development server (in a new terminal):
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
parfum/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── product/           # Product detail pages
│   ├── shop/              # Product catalog
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CartProvider.tsx
├── server/                # Backend API
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── index.js          # Express server
├── store/                # Zustand stores
│   ├── cartStore.ts
│   └── languageStore.ts
├── lib/                  # Utilities
│   └── translations.ts
└── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/related` - Get related products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderNumber` - Get order by number

### Admin
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

## Features Details

### Home Page
- Hero section with call-to-action
- Product categories navigation
- Featured products grid
- Customer testimonials
- Newsletter subscription

### Shop Page
- Product grid with filtering by category
- Search functionality
- Responsive product cards

### Product Detail Page
- Image gallery
- Product information and fragrance notes
- Related products
- Add to cart and favorites

### Checkout Page
- Customer information form
- Payment method selection
- Order summary sidebar
- Order confirmation

### Admin Dashboard
- Product management (CRUD)
- Order management
- Status updates

## Deployment

### Deploy Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm run server`
5. Add environment variables
6. Deploy

## Color Palette

- Background: `#F8F8F8`
- Text: `#000000`
- Accent (Gold): `#C5A572`
- Cards: `#FFFFFF`

## Language Support

The website supports both French and Arabic languages with:
- Dynamic language switching
- RTL support for Arabic
- Bilingual content throughout
- Persistent language preference

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact: contact@parfumex.tn



















