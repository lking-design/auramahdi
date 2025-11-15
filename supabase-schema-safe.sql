-- Supabase Database Schema for ParfumeX (Safe Version - Handles Existing Objects)
-- Run this SQL in your Supabase SQL Editor if you get "already exists" errors

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address_street VARCHAR(255),
  address_city VARCHAR(255),
  address_zipCode VARCHAR(50),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('perfume', 'gift-box', 'accessory')),
  subcategory VARCHAR(50) CHECK (subcategory IN ('eau-de-parfum', 'eau-de-toilette', 'spray-bottle', 'diffuser', 'other')),
  images JSONB DEFAULT '[]'::jsonb,
  fragrance_notes_top JSONB DEFAULT '[]'::jsonb,
  fragrance_notes_heart JSONB DEFAULT '[]'::jsonb,
  fragrance_notes_base JSONB DEFAULT '[]'::jsonb,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(255) NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_address VARCHAR(255) NOT NULL,
  customer_city VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cash-on-delivery', 'card')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom Perfumes Table
CREATE TABLE IF NOT EXISTS custom_perfumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) DEFAULT 'guest',
  bottle VARCHAR(255) NOT NULL,
  bottle_name VARCHAR(255) NOT NULL,
  perfume_type VARCHAR(255) NOT NULL,
  perfume_type_name VARCHAR(255) NOT NULL,
  scent VARCHAR(255) NOT NULL,
  scent_name VARCHAR(255) NOT NULL,
  concentration INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance (IF NOT EXISTS handled by CREATE INDEX IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist, then create new ones
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_custom_perfumes_updated_at ON custom_perfumes;
CREATE TRIGGER update_custom_perfumes_updated_at BEFORE UPDATE ON custom_perfumes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_count BIGINT;
BEGIN
  SELECT COUNT(*) INTO order_count FROM orders;
  RETURN 'ORD-' || EXTRACT(EPOCH FROM NOW())::BIGINT || '-' || (order_count + 1);
END;
$$ LANGUAGE plpgsql;



