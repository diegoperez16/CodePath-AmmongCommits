-- Migration script to update missions table structure
-- Run this in Supabase SQL Editor

-- Add new columns if they don't exist
ALTER TABLE missions 
ADD COLUMN IF NOT EXISTS badge TEXT,
ADD COLUMN IF NOT EXISTS what_you_learn TEXT,
ADD COLUMN IF NOT EXISTS steps TEXT[],
ADD COLUMN IF NOT EXISTS evidence TEXT,
ADD COLUMN IF NOT EXISTS story_part TEXT;

-- Update the category constraint to include 'default' instead of 'anytime'
ALTER TABLE missions DROP CONSTRAINT IF EXISTS missions_category_check;
ALTER TABLE missions ADD CONSTRAINT missions_category_check 
  CHECK (category IN ('default', 'detective', 'unlocked'));

-- Update existing 'anytime' categories to 'default'
UPDATE missions SET category = 'default' WHERE category = 'anytime';
