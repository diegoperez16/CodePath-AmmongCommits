-- ==========================================
-- GIT WORKSHOP MISSION BOARD - DATABASE SETUP
-- ==========================================
-- Run this entire script in Supabase SQL Editor
-- Copy and paste, then click "Run"
-- ==========================================

-- ==========================================
-- STEP 1: CREATE TABLES
-- ==========================================

-- Users table: stores student usernames
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Missions table: stores all mission data and states
CREATE TABLE IF NOT EXISTS missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('default', 'detective', 'unlocked')),
  difficulty TEXT NOT NULL,
  badge TEXT,
  what_you_learn TEXT,
  steps TEXT[],
  claimed_by TEXT,
  claimed_at TIMESTAMP WITH TIME ZONE,
  completed_by TEXT[] DEFAULT '{}',
  evidence TEXT,
  story_part TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- STEP 2: CREATE INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_missions_mission_id ON missions(mission_id);
CREATE INDEX IF NOT EXISTS idx_missions_claimed_by ON missions(claimed_by);
CREATE INDEX IF NOT EXISTS idx_missions_category ON missions(category);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- ==========================================
-- STEP 3: ENABLE ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- STEP 4: CREATE RLS POLICIES
-- ==========================================
-- Note: These are permissive policies for workshop use
-- In production, you'd want more restrictive policies

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Allow all operations on missions" ON missions;

-- Create new policies
CREATE POLICY "Allow all operations on users" 
  ON users 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on missions" 
  ON missions 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- OPTIONAL: PRE-POPULATE MISSIONS
-- ==========================================
-- Uncomment if you want missions in the database from the start
-- Otherwise, the app will create them on-demand

/*
INSERT INTO missions (mission_id, title, description, category, difficulty) VALUES
-- ANYTIME MISSIONS
('anytime-1', 'Clone and Run', 'Clone the repository and get the game running', 'anytime', 'Beginner'),
('anytime-2', 'Make a Branch', 'Create your own branch and push it to remote', 'anytime', 'Beginner'),
('anytime-3', 'Change Player Character', 'Customize your player appearance', 'anytime', 'Beginner'),
('anytime-4', 'Check the Git History', 'Explore commit history and find the saboteurs', 'anytime', 'Beginner'),
('anytime-5', 'Add to README', 'Add yourself to the contributors list', 'anytime', 'Beginner'),

-- DETECTIVE MISSIONS
('detective-1', 'Why Can''t I See Coins?', 'Coins should be visible but they''re not. Find and fix the rendering bug!', 'detective', 'Easy'),
('detective-2', 'Enemies Are Too Fast!', 'Enemies move at lightning speed. Slow them down!', 'detective', 'Easy'),
('detective-3', 'Score Goes Down!', 'Collecting coins decreases your score instead of increasing it', 'detective', 'Easy'),
('detective-4', 'Enemies Don''t Hurt Me', 'Player is invincible - enemies don''t cause damage', 'detective', 'Medium'),
('detective-5', 'Controls Are Backwards!', 'Left goes right, right goes left. Fix the controls!', 'detective', 'Medium'),
('detective-6', 'Enemy Invasion!', 'Enemies spawn way too fast, filling the screen instantly', 'detective', 'Easy'),
('detective-7', 'I Can''t Move!', 'Player is completely frozen and can''t move at all', 'detective', 'Medium'),
('detective-8', 'Game Quits Instantly!', 'Any keypress quits the game immediately', 'detective', 'Medium'),

-- UNLOCKED MISSIONS
('unlocked-1', 'Collect 10 Coins', 'Play the game and collect exactly 10 coins', 'unlocked', 'Challenge'),
('unlocked-2', 'Survive 30 Seconds', 'Stay alive for 30 seconds without dying', 'unlocked', 'Challenge'),
('unlocked-3', 'Add Power-Up System', 'Implement a new feature: collectible power-ups', 'unlocked', 'Advanced'),
('unlocked-4', 'Add High Score Persistence', 'Save high scores to a file and display them', 'unlocked', 'Medium'),
('unlocked-5', 'Add New Enemy Type', 'Create a new enemy with different behavior', 'unlocked', 'Advanced'),
('unlocked-6', 'Add Level System', 'Implement multiple levels with increasing difficulty', 'unlocked', 'Advanced')
ON CONFLICT (mission_id) DO NOTHING;
*/

-- ==========================================
-- VERIFICATION QUERIES
-- ==========================================
-- Run these to verify setup worked

-- Check tables exist
SELECT 'Tables created successfully' AS status;

-- View table structures
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name IN ('users', 'missions')
ORDER BY table_name, ordinal_position;

-- Check indexes
SELECT 
  tablename, 
  indexname 
FROM pg_indexes 
WHERE tablename IN ('users', 'missions');

-- Check RLS is enabled
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename IN ('users', 'missions');

-- ==========================================
-- USEFUL MAINTENANCE QUERIES
-- ==========================================

-- View all users
-- SELECT * FROM users ORDER BY created_at DESC;

-- View all missions with claim status
-- SELECT mission_id, title, category, claimed_by, claimed_at FROM missions ORDER BY category, mission_id;

-- Count missions by category
-- SELECT category, COUNT(*) as count FROM missions GROUP BY category;

-- Find active missions
-- SELECT mission_id, title, claimed_by FROM missions WHERE claimed_by IS NOT NULL;

-- Reset all mission claims (useful between workshops)
-- UPDATE missions SET claimed_by = NULL, claimed_at = NULL;

-- Delete all users (careful!)
-- DELETE FROM users;

-- Delete all missions (careful!)
-- DELETE FROM missions;

-- Complete reset
-- TRUNCATE users, missions CASCADE;

-- ==========================================
-- SETUP COMPLETE!
-- ==========================================
-- Next steps:
-- 1. Check the verification queries above show success
-- 2. Copy your Project URL and anon key from Settings > API
-- 3. Add them to your .env.local file
-- 4. Run: npm run dev
-- 5. Test by logging in and claiming a mission
-- ==========================================
