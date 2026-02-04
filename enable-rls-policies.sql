-- Disable RLS and enable public access for workshop
-- Run this in Supabase SQL Editor AFTER running database-setup.sql

-- For users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new users
CREATE POLICY "Allow public insert on users" ON users
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read users
CREATE POLICY "Allow public read on users" ON users
  FOR SELECT
  USING (true);

-- For missions table
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read missions
CREATE POLICY "Allow public read on missions" ON missions
  FOR SELECT
  USING (true);

-- Allow anyone to insert missions
CREATE POLICY "Allow public insert on missions" ON missions
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update missions
CREATE POLICY "Allow public update on missions" ON missions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete missions (for cleanup)
CREATE POLICY "Allow public delete on missions" ON missions
  FOR DELETE
  USING (true);

-- Verify policies are created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('users', 'missions');
