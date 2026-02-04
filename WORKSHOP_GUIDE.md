# Workshop Quick Start Guide

Get your Git workshop mission board up and running in 10 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed ([download](https://nodejs.org))
- [ ] Supabase account ([sign up free](https://supabase.com))
- [ ] Terminal/command line access
- [ ] Code editor (VS Code recommended)

## 🚀 Quick Setup (10 minutes)

### Part 1: Supabase (5 minutes)

1. **Create project** at [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name it "git-workshop"
   - Wait ~2 minutes for setup

2. **Get credentials**
   - Settings > API
   - Copy "Project URL" and "anon public key"

3. **Create tables**
   - SQL Editor > New Query
   - Copy/paste from `SUPABASE_SETUP.md` (step 3)
   - Click "Run"

### Part 2: Mission Board (5 minutes)

1. **Install dependencies**
   ```bash
   cd mission-board
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```

3. **Start the app**
   ```bash
   npm run dev
   ```

4. **Test it**
   - Open [http://localhost:3000](http://localhost:3000)
   - Enter a username
   - Claim a mission!

## 🎯 Workshop Day Checklist

### Before Students Arrive

- [ ] App is running on accessible URL (localhost or deployed)
- [ ] Test login and mission claiming
- [ ] Prepare the Neon Runner game repo with sabotages
- [ ] Brief students on workshop goals

### During Workshop

1. **Introduction (5 min)**
   - Explain the mission board concept
   - Show how to claim missions
   - Demonstrate one mission completion

2. **Students Work (45-90 min)**
   - Students login
   - Claim missions
   - Work in the game repo
   - Mark complete when done

3. **Wrap-up (10 min)**
   - Review what was learned
   - Show completion stats
   - Q&A

## 📊 Recommended Workshop Flows

### 90-Minute Workshop (Beginners)
Focus on basics:
- ✅ All Anytime missions (5)
- ✅ 2-3 Easy Detective missions
- ✅ 1 Unlocked mission

### 2-Hour Workshop (Intermediate)
Balanced mix:
- ✅ All Anytime missions (5)
- ✅ 4-5 Detective missions
- ✅ 2 Unlocked missions

### 3-Hour Workshop (Advanced)
Complete experience:
- ✅ All missions
- ✅ Create custom missions
- ✅ Add new features to game

## 🎨 Customization Tips

### Adding Workshop-Specific Missions

Edit `/lib/missions.ts`:

```typescript
{
  id: '20',
  mission_id: 'workshop-1',
  title: 'Your Custom Mission',
  description: 'Specific to your workshop',
  category: 'detective',
  difficulty: 'Medium',
  badge: '🎯',
  whatYouLearn: 'Custom learning objective',
  steps: [
    'Specific instruction 1',
    'Specific instruction 2',
  ],
  claimedBy: null,
  claimedAt: null,
  completedBy: []
}
```

### Adjusting Mission Availability

To hide missions temporarily, comment them out in `missions.ts`:

```typescript
// Temporarily hidden
// {
//   id: '15',
//   mission_id: 'unlocked-2',
//   ...
// },
```

## 🔧 Common Issues

### "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### Students can't connect
- Share your local IP: `http://192.168.x.x:3000`
- Or deploy to Vercel for public access

### Mission sync issues
```bash
# Hard refresh in browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### Reset all progress
Run in Supabase SQL Editor:
```sql
TRUNCATE missions;
DELETE FROM users;
```

## 📱 For Students

Share this URL pattern with students:
```
http://[your-ip]:3000
# or
https://[your-deployment].vercel.app
```

**Student Instructions:**
1. Open the mission board URL
2. Enter your name/username
3. Browse missions by category
4. Click "Claim Mission" on one you want to do
5. Follow the steps in the mission
6. Click "Complete" when done
7. Repeat!

## 🚀 Deployment (Optional but Recommended)

Deploy to Vercel for easier student access:

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

You'll get a public URL like: `https://your-workshop.vercel.app`

## 📊 Monitoring During Workshop

**Check progress in Supabase:**
1. Table Editor > missions
2. See who claimed what
3. See completion stats

**View in app:**
- Stats shown in header
- Filter by category
- See "Your Active Missions" section

## 🎓 Learning Outcomes

By the end, students will know:
- ✅ Git clone, branch, commit, push
- ✅ Reading git history and logs
- ✅ Finding bugs using git tools
- ✅ Making code changes and committing
- ✅ Collaborative workflow basics

## 🆘 Need Help?

1. Check `README.md` for detailed docs
2. Check `SUPABASE_SETUP.md` for DB issues
3. Check browser console for errors
4. Check Supabase logs for DB errors

## 🎉 Post-Workshop

**Keep learning:**
- Students can continue working on missions
- Add more challenging unlocked missions
- Encourage students to create custom missions
- Use as template for future workshops

**Data cleanup:**
```sql
-- Archive workshop data
CREATE TABLE workshop_1_users AS SELECT * FROM users;
CREATE TABLE workshop_1_missions AS SELECT * FROM missions;

-- Clean for next workshop
TRUNCATE users, missions;
```

---

**Ready to run your workshop?** Let's go! 🚀

Quick command recap:
```bash
cd mission-board
npm install
# Add your .env.local with Supabase credentials
npm run dev
# Share the URL with students
```
