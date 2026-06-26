-- Run this in your Supabase SQL editor to set up the products table

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Phones', 'Laptops', 'TVs', 'Accessories')),
  price NUMERIC NOT NULL,
  image TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public read access (anyone can see products)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Service role can do everything"
  ON products FOR ALL
  USING (true);

-- Optional: seed with a sample product
INSERT INTO products (name, category, price, image, description, featured)
VALUES (
  'Samsung 55" 4K Smart TV',
  'TVs',
  85000,
  'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
  'Crystal clear 4K UHD display with built-in smart TV features.',
  true
);
