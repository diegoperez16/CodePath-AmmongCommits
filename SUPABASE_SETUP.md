# Supabase Setup Guide

Complete step-by-step guide to set up Supabase for the Mission Board.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: git-workshop-missions (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is perfect
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

## Step 2: Get Your API Credentials

1. Once the project is ready, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API keys**:
     - `anon/public` key (this is what you need)
     - `service_role` key (don't use this in the app)

4. Copy these values - you'll need them for your `.env.local` file

## Step 3: Create Database Tables

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **"New query"**
3. Paste this SQL and click **"Run"**:

```sql
-- ==========================================
-- USERS TABLE
-- ==========================================
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- MISSIONS TABLE
-- ==========================================
CREATE TABLE missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('anytime', 'detective', 'unlocked')),
  difficulty TEXT NOT NULL,
  claimed_by TEXT,
  claimed_at TIMESTAMP WITH TIME ZONE,
  completed_by TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_missions_mission_id ON missions(mission_id);
CREATE INDEX idx_missions_claimed_by ON missions(claimed_by);
CREATE INDEX idx_missions_category ON missions(category);
CREATE INDEX idx_users_username ON users(username);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Allow all operations for workshop purposes
-- (In production, you'd want more restrictive policies)
CREATE POLICY "Allow all operations on users" 
  ON users FOR ALL 
  USING (true);

CREATE POLICY "Allow all operations on missions" 
  ON missions FOR ALL 
  USING (true);
```

4. You should see: **"Success. No rows returned"**

## Step 4: Verify Tables Were Created

1. Click **Table Editor** in the sidebar
2. You should see two tables:
   - `users`
   - `missions`

3. Click on each table to verify the columns are correct

### Users table columns:
- id (uuid)
- username (text)
- created_at (timestamptz)

### Missions table columns:
- id (uuid)
- mission_id (text)
- title (text)
- description (text)
- category (text)
- difficulty (text)
- claimed_by (text)
- claimed_at (timestamptz)
- completed_by (text[])
- created_at (timestamptz)

## Step 5: Configure Your App

1. In your `mission-board` directory, create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace with your actual values from Step 2

## Step 6: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)
3. Try logging in with a username
4. Try claiming a mission

5. Go back to Supabase **Table Editor** and check:
   - The `users` table should have your username
   - The `missions` table should have the mission you claimed

## Optional: Pre-populate Missions

If you want missions to be in the database from the start (instead of being created on-demand), run this SQL:

```sql
INSERT INTO missions (mission_id, title, description, category, difficulty) VALUES
('anytime-1', 'Clone and Run', 'Clone the repository and get the game running', 'anytime', 'Beginner'),
('anytime-2', 'Make a Branch', 'Create your own branch and push it to remote', 'anytime', 'Beginner'),
('anytime-3', 'Change Player Character', 'Customize your player appearance', 'anytime', 'Beginner'),
('anytime-4', 'Check the Git History', 'Explore commit history and find the saboteurs', 'anytime', 'Beginner'),
('anytime-5', 'Add to README', 'Add yourself to the contributors list', 'anytime', 'Beginner'),
('detective-1', 'Why Can''t I See Coins?', 'Coins should be visible but they''re not. Find and fix the rendering bug!', 'detective', 'Easy'),
('detective-2', 'Enemies Are Too Fast!', 'Enemies move at lightning speed. Slow them down!', 'detective', 'Easy'),
('detective-3', 'Score Goes Down!', 'Collecting coins decreases your score instead of increasing it', 'detective', 'Easy'),
('detective-4', 'Enemies Don''t Hurt Me', 'Player is invincible - enemies don''t cause damage', 'detective', 'Medium'),
('detective-5', 'Controls Are Backwards!', 'Left goes right, right goes left. Fix the controls!', 'detective', 'Medium'),
('detective-6', 'Enemy Invasion!', 'Enemies spawn way too fast, filling the screen instantly', 'detective', 'Easy'),
('detective-7', 'I Can''t Move!', 'Player is completely frozen and can''t move at all', 'detective', 'Medium'),
('detective-8', 'Game Quits Instantly!', 'Any keypress quits the game immediately', 'detective', 'Medium');
```

## Troubleshooting

### "Failed to create project"
- Check your email confirmation
- Try a different project name
- Wait a few minutes and try again

### "Row Level Security" errors
- Make sure you ran the RLS policies SQL
- Verify policies exist in: **Authentication** > **Policies**

### Can't see tables
- Go to SQL Editor and run: `SELECT * FROM users;`
- If you get an error, tables weren't created correctly
- Re-run the table creation SQL

### Connection errors in the app
- Verify `.env.local` has correct values
- Make sure you're using the **anon/public** key (not service_role)
- Restart your dev server after changing .env.local
- Check URL starts with `https://` and has `.supabase.co`

## Useful Supabase Features

### View Live Data
- **Table Editor**: See and edit data in real-time
- Click on a table, then browse/edit rows

### Reset Everything
```sql
-- Clear all data but keep tables
TRUNCATE users, missions;

-- Or drop and recreate
DROP TABLE users, missions CASCADE;
-- Then run the CREATE TABLE statements again
```

### Monitor Activity
- **Logs** section shows all database queries
- Useful for debugging

### Database Backups
- Free tier: Daily backups for 7 days
- Go to **Database** > **Backups**

## Next Steps

1. ✅ Tables created
2. ✅ App connected
3. ✅ Test user login
4. ✅ Test mission claiming

You're ready to run your workshop! 🎉

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check the mission-board README.md
