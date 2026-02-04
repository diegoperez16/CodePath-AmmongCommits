# Mission Board Updates - Summary

## Changes Made

### 1. Mission Categories Restructured
- **Removed 'anytime' category** → Replaced with **'default'** category
- **Default missions** are now required for everyone to complete before moving to detective missions
- These teach Git fundamentals (clone, branch, status, commit, history, etc.)

### 2. New Detective Investigation Missions Added
Added missions that build a case investigation:
- **List All Collaborators** - Find all 5 developers who worked on the project
- **Count the Files** - Discover how many files compose the game
- **Find Suspicious Commits** - Search for commits with suspicious messages
- Plus existing bug-fixing missions (coins, enemies, score, etc.)
- **The Pattern Emerges** - Final mission to identify the saboteur

### 3. Story Reveal System
Created a progressive story that unfolds as missions are completed:
- **6 story parts** revealed based on mission completion
- Story reveals: Team introduction → Collaboration → Tension → Sabotage → Evidence → Resolution
- **Visual progress bar** shows case completion percentage
- **Final reveal**: Alfredo felt undervalued and sabotaged the game

### 4. Evidence Submission for Detective Missions
- Detective missions now require **evidence submission** before completion
- Text area for entering proof (commit hash, author name, line number, etc.)
- Button changes from "Complete" to "Submit Evidence" for detective missions

### 5. Database Updates
Created migration scripts to update Supabase:

#### New Schema Fields:
- `badge` - Mission badge identifier
- `what_you_learn` - Learning objective
- `steps` - Array of mission steps
- `evidence` - Submitted evidence text
- `story_part` - Which story section this mission reveals
- Updated category constraint: 'default', 'detective', 'unlocked'

#### Database Files Created:
- `migrate-database.sql` - Migration script to update existing table
- `seed-missions.sql` - Script to populate all 17 missions

## How to Apply Database Changes

### Step 1: Run Migration
In Supabase SQL Editor, run `migrate-database.sql`:
```sql
-- This adds new columns and updates categories
```

### Step 2: Seed Missions
Run `seed-missions.sql` to populate all missions:
```sql
-- This inserts all 17 missions
```

## Mission Breakdown

### Default Missions (5) - Required
1. Clone and Run
2. Make a Branch  
3. Git Status Check
4. Stage and Commit
5. View File History

### Detective Missions (9) - Investigation
1. List All Collaborators *(reveals team story)*
2. Count the Files
3. Find Suspicious Commits *(reveals tension story)*
4. Why Can't I See Coins? *(reveals sabotage story)*
5. Enemies Are Too Fast! *(reveals sabotage story)*
6. Score Goes Down! *(reveals sabotage story)*
7. Enemies Don't Hurt Me *(reveals evidence story)*
8. Controls Are Backwards! *(reveals evidence story)*
9. The Pattern Emerges *(reveals resolution story)*

### Unlocked Missions (3) - Bonus Challenges
1. Collect 10 Coins
2. Survive 30 Seconds
3. Add Power-Up System

## UI Changes

### Mission Board Layout:
1. **Header** - Shows agent name, active missions, completed count
2. **Story Panel** - Shows revealed story parts with progress bar
3. **Default Missions Section** - Required missions displayed separately
4. **Category Tabs** - Switch between Detective and Unlocked missions
5. **Active Missions** - User's claimed missions shown at top

### Password Protection:
- Unlocked missions require password: `g1tIsAw3s0m3`
- Modal prompt appears when trying to access locked missions

## Files Modified:
- `/lib/missions.ts` - Complete mission restructure
- `/components/MissionBoard.tsx` - Updated UI and categories
- `/components/MissionCard.tsx` - Added evidence submission
- `/components/StoryPanel.tsx` - NEW - Story reveal component
- `/database-setup.sql` - Updated schema
- `/migrate-database.sql` - NEW - Migration script
- `/seed-missions.sql` - NEW - Seed data script

## Next Steps:
1. Run the migration script in Supabase
2. Run the seed script to populate missions
3. Test the mission board
4. All missions should now sync properly across users
