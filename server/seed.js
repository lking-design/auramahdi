const Product = require('./models/Product');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
// Fallback to .env if .env.local doesn't exist
if (!process.env.DB_HOST) {
  require('dotenv').config();
}
const pool = require('./db');

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
    stock: 50,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop',
    ],
    fragranceNotes: {
      top: ['Bergamot', 'Lemon'],
      heart: ['Jasmine', 'Rose', 'Lily'],
      base: ['Sandalwood', 'Musk', 'Amber'],
    },
    rating: 4.5,
  },
  {
    name: 'Eau de Toilette Fresh',
    nameAr: 'عطر منعش',
    description: 'Fresh and light fragrance perfect for everyday wear with citrus and aquatic notes.',
    descriptionAr: 'عطر منعش وخفيف مثالي للارتداء اليومي بملاحظات الحمضيات والمائية.',
    price: 59.99,
    category: 'perfume',
    subcategory: 'eau-de-toilette',
    stock: 75,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
    ],
    fragranceNotes: {
      top: ['Grapefruit', 'Lemon', 'Bergamot'],
      heart: ['Mint', 'Lavender'],
      base: ['Cedar', 'Vetiver'],
    },
    rating: 4.3,
  },
  {
    name: 'Parfum Intense Noir',
    nameAr: 'عطر أسود مكثف',
    description: 'Deep and mysterious fragrance with dark woody notes and vanilla. For the bold and confident.',
    descriptionAr: 'عطر عميق وغامض بملاحظات خشبية داكنة والفانيليا. للجرأة والثقة.',
    price: 129.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    stock: 40,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    ],
    fragranceNotes: {
      top: ['Black Pepper', 'Bergamot'],
      heart: ['Rose', 'Jasmine', 'Patchouli'],
      base: ['Vanilla', 'Amber', 'Sandalwood'],
    },
    rating: 4.7,
  },
  {
    name: 'Eau de Parfum Floral',
    nameAr: 'عطر زهري',
    description: 'Delicate floral bouquet with notes of rose, peony, and magnolia. Feminine and elegant.',
    descriptionAr: 'باقة زهرية رقيقة بملاحظات الورد والبيونيا والماغنوليا. أنثوي وأنيق.',
    price: 79.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    stock: 65,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop',
    ],
    fragranceNotes: {
      top: ['Peony', 'Pink Pepper'],
      heart: ['Rose', 'Magnolia', 'Lily'],
      base: ['Musk', 'Amber'],
    },
    rating: 4.4,
  },
  {
    name: 'Eau de Toilette Sport',
    nameAr: 'عطر رياضي',
    description: 'Energetic and dynamic fragrance with fresh aquatic and green notes. Perfect for active lifestyle.',
    descriptionAr: 'عطر نشط وديناميكي بملاحظات مائية وخضراء منعشة. مثالي لنمط الحياة النشط.',
    price: 49.99,
    category: 'perfume',
    subcategory: 'eau-de-toilette',
    stock: 90,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
    ],
    fragranceNotes: {
      top: ['Lemon', 'Ginger', 'Grapefruit'],
      heart: ['Marine Notes', 'Jasmine'],
      base: ['Musk', 'Cedar'],
    },
    rating: 4.2,
  },
  {
    name: 'Parfum Oriental Luxe',
    nameAr: 'عطر شرقي فاخر',
    description: 'Luxurious oriental fragrance with rich spices, oud, and precious woods. Exotic and captivating.',
    descriptionAr: 'عطر شرقي فاخر بتوابل غنية والعود والأخشاب الثمينة. غريب وجذاب.',
    price: 159.99,
    category: 'perfume',
    subcategory: 'eau-de-parfum',
    stock: 30,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600857062242-af43a443c7e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop',
    ],
    fragranceNotes: {
      top: ['Saffron', 'Cinnamon'],
      heart: ['Oud', 'Rose', 'Jasmine'],
      base: ['Amber', 'Sandalwood', 'Patchouli'],
    },
    rating: 4.8,
  },

  // GIFT BOXES
  {
    name: 'Coffret Cadeau Prestige',
    nameAr: 'صندوق الهدايا الفاخر',
    description: 'Luxury gift box containing 3 premium fragrances in elegant packaging. Perfect gift for special occasions.',
    descriptionAr: 'صندوق هدايا فاخر يحتوي على 3 عطور مميزة بتغليف أنيق. هدية مثالية للمناسبات الخاصة.',
    price: 199.99,
    category: 'gift-box',
    stock: 30,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600857062242-af43a443c7e0?w=800&h=800&fit=crop',
    ],
    rating: 4.8,
  },
  {
    name: 'Parfum Royal Collection',
    nameAr: 'مجموعة العطور الملكية',
    description: 'Exclusive collection of 5 luxury fragrances in a premium presentation box with golden details.',
    descriptionAr: 'مجموعة حصرية من 5 عطور فاخرة في صندوق عرض مميز بتفاصيل ذهبية.',
    price: 349.99,
    category: 'gift-box',
    stock: 20,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600857062242-af43a443c7e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop',
    ],
    rating: 4.9,
  },
  {
    name: 'Coffret Découverte',
    nameAr: 'صندوق الاكتشاف',
    description: 'Perfect gift box with 2 best-selling fragrances and a travel-size spray. Ideal for trying new scents.',
    descriptionAr: 'صندوق هدايا مثالي مع عطرين من الأفضل مبيعاً ورذاذ بحجم السفر. مثالي لتجربة روائح جديدة.',
    price: 149.99,
    category: 'gift-box',
    stock: 45,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
    ],
    rating: 4.6,
  },
  {
    name: 'Coffret Luxe Premium',
    nameAr: 'صندوق فاخر مميز',
    description: 'Ultimate luxury gift box with 4 exclusive fragrances in an elegant black and gold case.',
    descriptionAr: 'صندوق هدايا فاخر نهائي مع 4 عطور حصرية في علبة أنيقة سوداء وذهبية.',
    price: 449.99,
    category: 'gift-box',
    stock: 15,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600857062242-af43a443c7e0?w=800&h=800&fit=crop',
    ],
    rating: 4.9,
  },
  {
    name: 'Coffret Romance',
    nameAr: 'صندوق رومانسي',
    description: 'Romantic gift set with 2 matching fragrances for couples, beautifully packaged with a ribbon.',
    descriptionAr: 'مجموعة هدايا رومانسية مع عطرين متطابقين للأزواج، معبأة بشكل جميل بشريط.',
    price: 179.99,
    category: 'gift-box',
    stock: 35,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop',
    ],
    rating: 4.7,
  },

  // ACCESSORIES
  {
    name: 'Spray Bottle Premium',
    nameAr: 'زجاجة رش فاخرة',
    description: 'Premium refillable perfume spray bottle with elegant glass design and gold-plated cap.',
    descriptionAr: 'زجاجة عطر قابلة لإعادة الملء بتصميم زجاجي أنيق وغطاء مطلي بالذهب.',
    price: 24.99,
    category: 'accessory',
    subcategory: 'spray-bottle',
    stock: 100,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    ],
    rating: 4.2,
  },
  {
    name: 'Diffuseur de Parfum',
    nameAr: 'ناشر العطر',
    description: 'Elegant room fragrance diffuser with natural reed sticks. Creates a subtle, long-lasting scent.',
    descriptionAr: 'ناشر عطر أنيق للغرفة بعيدان قصب طبيعية. يخلق رائحة خفيفة وطويلة الأمد.',
    price: 34.99,
    category: 'accessory',
    subcategory: 'diffuser',
    stock: 60,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
    ],
    rating: 4.1,
  },
  {
    name: 'Travel Perfume Set',
    nameAr: 'مجموعة عطور السفر',
    description: 'Set of 3 travel-size perfume bottles with atomizer. Perfect for carrying your favorite scents on the go.',
    descriptionAr: 'مجموعة من 3 زجاجات عطر بحجم السفر مع مرذاذ. مثالية لحمل عطورك المفضلة أثناء التنقل.',
    price: 39.99,
    category: 'accessory',
    subcategory: 'spray-bottle',
    stock: 80,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
    ],
    rating: 4.5,
  },
  {
    name: 'Perfume Organizer Box',
    nameAr: 'صندوق تنظيم العطور',
    description: 'Luxurious velvet-lined organizer box to store and display your perfume collection elegantly.',
    descriptionAr: 'صندوق تنظيم مبطن بالقطيفة لحفظ وعرض مجموعة عطورك بأناقة.',
    price: 49.99,
    category: 'accessory',
    subcategory: 'other',
    stock: 50,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1600857062242-af43a443c7e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop',
    ],
    rating: 4.3,
  },
  {
    name: 'Reed Diffuser Set',
    nameAr: 'مجموعة ناشر القصب',
    description: 'Complete reed diffuser set with fragrance oil and natural reed sticks. Long-lasting room fragrance.',
    descriptionAr: 'مجموعة ناشر قصب كاملة مع زيت العطر وعيدان القصب الطبيعية. عطر غرفة طويل الأمد.',
    price: 29.99,
    category: 'accessory',
    subcategory: 'diffuser',
    stock: 70,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
    ],
    rating: 4.4,
  },
  {
    name: 'Perfume Atomizer Refillable',
    nameAr: 'مرذاذ عطر قابل لإعادة الملء',
    description: 'Premium aluminum atomizer bottle for easy perfume refills. Leak-proof and portable design.',
    descriptionAr: 'زجاجة مرذاذ من الألمنيوم عالي الجودة لإعادة تعبئة العطر بسهولة. تصميم محكم ضد التسرب وقابل للحمل.',
    price: 19.99,
    category: 'accessory',
    subcategory: 'spray-bottle',
    stock: 120,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    ],
    rating: 4.0,
  },
];

async function seedDatabase() {
  try {
    // Test connection
    await pool.getConnection();
    console.log('Connected to MySQL');

    // Clear existing products
    await pool.execute('DELETE FROM products');
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

