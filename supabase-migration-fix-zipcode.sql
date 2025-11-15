-- Migration: Fix address_zipCode column name to address_zipcode
-- Run this in Supabase SQL Editor if you already created the users table

-- Check if column exists with wrong case and rename it
DO $$
BEGIN
  -- Check if address_zipCode exists (with capital C)
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'address_zipcode'
  ) THEN
    -- Column already exists with correct name, do nothing
    RAISE NOTICE 'Column address_zipcode already exists with correct name';
  ELSIF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'address_zipCode'
  ) THEN
    -- Rename the column
    ALTER TABLE users RENAME COLUMN "address_zipCode" TO address_zipcode;
    RAISE NOTICE 'Column renamed from address_zipCode to address_zipcode';
  ELSE
    -- Column doesn't exist, add it
    ALTER TABLE users ADD COLUMN address_zipcode VARCHAR(50);
    RAISE NOTICE 'Column address_zipcode added';
  END IF;
END $$;

