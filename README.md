# Git Workshop Mission Board

A web application for managing workshop missions where students can claim, complete, and track their progress through git-related tasks.

![Mission Board](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-DB-green?style=for-the-badge&logo=supabase)

## Features

- 🎮 **Mission Categories**: Anytime, Detective, and Unlocked missions
- 🔒 **Mission Locking**: Claim missions to prevent others from working on the same task
- ✅ **Progress Tracking**: Mark missions as complete and track your achievements
- 👥 **Multi-User Support**: Multiple students can work simultaneously
- 💾 **Persistent State**: All data stored in Supabase database
- 🎨 **Neon-Themed UI**: Retro gaming aesthetic matching the Neon Runner game

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works perfectly)

### 1. Install Dependencies

```bash
cd mission-board
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to **Settings** > **API**
3. Copy your **Project URL** and **anon/public key**

### 3. Configure Environment Variables

Create a `.env.local` file in the mission-board directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set Up Database Tables

In your Supabase project dashboard, go to the **SQL Editor** and run this SQL:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create missions table
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

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for workshop purposes)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on missions" ON missions FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_missions_mission_id ON missions(mission_id);
CREATE INDEX idx_missions_claimed_by ON missions(claimed_by);
CREATE INDEX idx_users_username ON users(username);
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Students

1. **Login**: Enter your username on the welcome screen
2. **Browse Missions**: View all available missions organized by category
3. **Claim Mission**: Click "Claim Mission" to lock it (prevents others from claiming)
4. **Work on Task**: Follow the mission steps in the Neon Runner repository
5. **Complete**: Mark the mission as complete when done
6. **Track Progress**: See your active and completed missions

### For Instructors

The mission data is defined in `/lib/missions.ts`. You can:
- Add new missions
- Modify existing missions
- Adjust difficulty levels
- Customize mission steps

To reset all missions:
```sql
-- In Supabase SQL Editor
TRUNCATE missions;
DELETE FROM users;
```

## Mission Categories

### 🎮 Anytime Missions (5 missions)
Basic Git skills that can be done anytime:
- Clone and run the game
- Create branches
- Make commits
- Explore git history

### 🔍 Detective Missions (8 missions)
Find and fix bugs in the Neon Runner game:
- Invisible coins
- Fast enemies
- Reversed controls
- Broken scoring
- And more...

### 🔓 Unlocked Missions (6 missions)
Advanced challenges and feature additions:
- Add power-ups
- Implement high scores
- Create new enemy types
- Add level systems

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [vercel.com](https://vercel.com)
3. Add your environment variables in Vercel settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Customization

### Adding New Missions

Edit `/lib/missions.ts`:

```typescript
{
  id: '20',
  mission_id: 'custom-1',
  title: 'Your Mission Title',
  description: 'Brief description',
  category: 'detective', // or 'anytime' or 'unlocked'
  difficulty: 'Medium',
  badge: '🎯',
  whatYouLearn: 'What students will learn',
  steps: [
    'Step 1: Do this',
    'Step 2: Then this',
    'Step 3: Finally this'
  ],
  claimedBy: null,
  claimedAt: null,
  completedBy: []
}
```

### Styling

The app uses a neon/cyberpunk theme with:
- Cyan and purple accent colors
- Dark background gradients
- Glowing effects and shadows

Modify colors in `tailwind.config.ts` or component styles.

## Database Schema

### Users Table
```
id: UUID (primary key)
username: TEXT (unique)
created_at: TIMESTAMP
```

### Missions Table
```
id: UUID (primary key)
mission_id: TEXT (unique)
title: TEXT
description: TEXT
category: TEXT (enum: anytime, detective, unlocked)
difficulty: TEXT
claimed_by: TEXT (nullable)
claimed_at: TIMESTAMP (nullable)
completed_by: TEXT[] (array of usernames)
created_at: TIMESTAMP
```

## Troubleshooting

### "Error loading missions"
- Check your Supabase connection
- Verify environment variables are set correctly
- Check browser console for detailed errors

### Missions not syncing
- Make sure your database tables are created correctly
- Check RLS policies are allowing operations
- Try clearing browser localStorage

### Can't claim missions
- Verify user is logged in (check localStorage for 'workshop_user')
- Check if mission is already claimed by someone else
- Refresh the page to get latest data

## Contributing

Feel free to customize this app for your workshop needs! Some ideas:
- Add mission prerequisites
- Implement team features
- Add a leaderboard
- Create mission timer/deadlines
- Add chat or comments

## License

MIT License - feel free to use and modify for your workshops!

## Support

For questions or issues:
1. Check the Troubleshooting section
2. Review Supabase logs
3. Check browser console for errors
4. Verify all setup steps were completed

Happy coding! 🚀
