const Product = require('./models/Product-supabase');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
}
require('./db-supabase');

const sampleProducts = [
  // PERFUMES
  {
    name: 'Eau de Parfum Élégance',
    nameAr: 'عطر النخبة',
    description: 'A sophisticated fragrance with notes of jasmine, rose, and sandalwood. Perfect for special occasions.',
    descriptionAr: 'عطر راقي بملاحظات الياسمين والورد والصندل. مثالي للمناسبات الخاصة.',
    price: 89.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: ['Bergamot', 'Lemon'],
      heart: ['Jasmine', 'Rose'],
      base: ['Sandalwood', 'Musk'],
    },
    stock: 50,
    featured: true,
    rating: 4.5,
  },
  {
    name: 'Eau de Toilette Fraîcheur',
    nameAr: 'عطر النضارة',
    description: 'A fresh and light fragrance perfect for everyday wear. Notes of citrus and green tea.',
    descriptionAr: 'عطر منعش وخفيف مثالي للارتداء اليومي. ملاحظات الحمضيات والشاي الأخضر.',
    price: 65.99,
    category: 'perfume',
    subcategory: 'eau-de-toilette',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: ['Grapefruit', 'Lemon'],
      heart: ['Green Tea', 'Mint'],
      base: ['White Musk'],
    },
    stock: 75,
    featured: false,
    rating: 4.2,
  },
  {
    name: 'Parfum Intense',
    nameAr: 'عطر مكثف',
    description: 'An intense and long-lasting fragrance with rich oriental notes.',
    descriptionAr: 'عطر مكثف وطويل الأمد بملاحظات شرقية غنية.',
    price: 120.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: ['Black Pepper', 'Saffron'],
      heart: ['Rose', 'Oud'],
      base: ['Amber', 'Vanilla'],
    },
    stock: 30,
    featured: true,
    rating: 4.8,
  },
  // GIFT BOXES
  {
    name: 'Coffret Découverte',
    nameAr: 'صندوق الاكتشاف',
    description: 'A beautiful gift box containing 3 mini perfumes. Perfect for trying new scents.',
    descriptionAr: 'صندوق هدايا جميل يحتوي على 3 عطور صغيرة. مثالي لتجربة روائح جديدة.',
    price: 45.99,
    category: 'gift-box',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: [],
      heart: [],
      base: [],
    },
    stock: 40,
    featured: false,
    rating: 4.3,
  },
  {
    name: 'Coffret Prestige',
    nameAr: 'صندوق النخبة',
    description: 'Luxury gift box with 5 premium fragrances in elegant bottles.',
    descriptionAr: 'صندوق هدايا فاخر يحتوي على 5 عطور راقية في زجاجات أنيقة.',
    price: 199.99,
    category: 'gift-box',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: [],
      heart: [],
      base: [],
    },
    stock: 25,
    featured: true,
    rating: 4.7,
  },
  // ACCESSORIES
  {
    name: 'Vaporisateur de Voyage',
    nameAr: 'بخاخ السفر',
    description: 'Travel-size perfume spray bottle. Refillable and elegant.',
    descriptionAr: 'زجاجة عطر بحجم السفر. قابلة لإعادة الملء وأنيقة.',
    price: 15.99,
    category: 'accessory',
    subcategory: 'spray-bottle',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: [],
      heart: [],
      base: [],
    },
    stock: 100,
    featured: false,
    rating: 4.0,
  },
];

async function seedDatabase() {
  try {
    console.log('Connected to Supabase');

    // Clear existing products
    const supabase = require('./db-supabase');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('Cleared existing products');

    // Insert sample products
    for (const product of sampleProducts) {
      await Product.create(product);
    }
    console.log(`Inserted ${sampleProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();



const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
}
require('./db-supabase');

const sampleProducts = [
  // PERFUMES
  {
    name: 'Eau de Parfum Élégance',
    nameAr: 'عطر النخبة',
    description: 'A sophisticated fragrance with notes of jasmine, rose, and sandalwood. Perfect for special occasions.',
    descriptionAr: 'عطر راقي بملاحظات الياسمين والورد والصندل. مثالي للمناسبات الخاصة.',
    price: 89.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: ['Bergamot', 'Lemon'],
      heart: ['Jasmine', 'Rose'],
      base: ['Sandalwood', 'Musk'],
    },
    stock: 50,
    featured: true,
    rating: 4.5,
  },
  {
    name: 'Eau de Toilette Fraîcheur',
    nameAr: 'عطر النضارة',
    description: 'A fresh and light fragrance perfect for everyday wear. Notes of citrus and green tea.',
    descriptionAr: 'عطر منعش وخفيف مثالي للارتداء اليومي. ملاحظات الحمضيات والشاي الأخضر.',
    price: 65.99,
    category: 'perfume',
    subcategory: 'eau-de-toilette',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: ['Grapefruit', 'Lemon'],
      heart: ['Green Tea', 'Mint'],
      base: ['White Musk'],
    },
    stock: 75,
    featured: false,
    rating: 4.2,
  },
  {
    name: 'Parfum Intense',
    nameAr: 'عطر مكثف',
    description: 'An intense and long-lasting fragrance with rich oriental notes.',
    descriptionAr: 'عطر مكثف وطويل الأمد بملاحظات شرقية غنية.',
    price: 120.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: ['Black Pepper', 'Saffron'],
      heart: ['Rose', 'Oud'],
      base: ['Amber', 'Vanilla'],
    },
    stock: 30,
    featured: true,
    rating: 4.8,
  },
  // GIFT BOXES
  {
    name: 'Coffret Découverte',
    nameAr: 'صندوق الاكتشاف',
    description: 'A beautiful gift box containing 3 mini perfumes. Perfect for trying new scents.',
    descriptionAr: 'صندوق هدايا جميل يحتوي على 3 عطور صغيرة. مثالي لتجربة روائح جديدة.',
    price: 45.99,
    category: 'gift-box',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: [],
      heart: [],
      base: [],
    },
    stock: 40,
    featured: false,
    rating: 4.3,
  },
  {
    name: 'Coffret Prestige',
    nameAr: 'صندوق النخبة',
    description: 'Luxury gift box with 5 premium fragrances in elegant bottles.',
    descriptionAr: 'صندوق هدايا فاخر يحتوي على 5 عطور راقية في زجاجات أنيقة.',
    price: 199.99,
    category: 'gift-box',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: [],
      heart: [],
      base: [],
    },
    stock: 25,
    featured: true,
    rating: 4.7,
  },
  // ACCESSORIES
  {
    name: 'Vaporisateur de Voyage',
    nameAr: 'بخاخ السفر',
    description: 'Travel-size perfume spray bottle. Refillable and elegant.',
    descriptionAr: 'زجاجة عطر بحجم السفر. قابلة لإعادة الملء وأنيقة.',
    price: 15.99,
    category: 'accessory',
    subcategory: 'spray-bottle',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop'],
    fragranceNotes: {
      top: [],
      heart: [],
      base: [],
    },
    stock: 100,
    featured: false,
    rating: 4.0,
  },
];

async function seedDatabase() {
  try {
    console.log('Connected to Supabase');

    // Clear existing products
    const supabase = require('./db-supabase');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('Cleared existing products');

    // Insert sample products
    for (const product of sampleProducts) {
      await Product.create(product);
    }
    console.log(`Inserted ${sampleProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();



