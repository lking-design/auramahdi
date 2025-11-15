const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
if (!process.env.DB_HOST) {
  require('dotenv').config();
}

async function initDatabase() {
  let connection;
  try {
    // Connect without database first to create it
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    const dbName = process.env.DB_NAME || 'parfumex';
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' ready`);

    await connection.query(`USE \`${dbName}\``);

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address_street VARCHAR(255),
        address_city VARCHAR(255),
        address_zipCode VARCHAR(50),
        role ENUM('user', 'admin') DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nameAr VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        descriptionAr TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category ENUM('perfume', 'gift-box', 'accessory') NOT NULL,
        subcategory ENUM('eau-de-parfum', 'eau-de-toilette', 'spray-bottle', 'diffuser', 'other'),
        images JSON,
        fragranceNotes_top JSON,
        fragranceNotes_heart JSON,
        fragranceNotes_base JSON,
        stock INT DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        rating DECIMAL(3, 2) DEFAULT 0,
        reviews JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Products table created');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderNumber VARCHAR(255) NOT NULL UNIQUE,
        userId INT,
        customer_name VARCHAR(255) NOT NULL,
        customer_address VARCHAR(255) NOT NULL,
        customer_city VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        items JSON NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        shipping DECIMAL(10, 2) DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        paymentMethod ENUM('cash-on-delivery', 'card') NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('Orders table created');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS custom_perfumes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255) DEFAULT 'guest',
        bottle VARCHAR(255) NOT NULL,
        bottleName VARCHAR(255) NOT NULL,
        perfumeType VARCHAR(255) NOT NULL,
        perfumeTypeName VARCHAR(255) NOT NULL,
        scent VARCHAR(255) NOT NULL,
        scentName VARCHAR(255) NOT NULL,
        concentration INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'completed') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Custom perfumes table created');

    console.log('Database initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();





