# Instructor Checklist - Workshop Day

## 📋 Pre-Workshop Setup (1-2 days before)

### Supabase Setup
- [ ] Create Supabase project at [supabase.com](https://supabase.com)
- [ ] Run `database-setup.sql` in SQL Editor
- [ ] Verify tables created (users, missions)
- [ ] Test database connection
- [ ] Save Project URL and anon key

### Mission Board Setup
- [ ] Clone/download mission board code
- [ ] Run `npm install` in mission-board directory
- [ ] Create `.env.local` with Supabase credentials
- [ ] Test locally with `npm run dev`
- [ ] Verify login works
- [ ] Verify mission claiming works
- [ ] Check missions display correctly

### Deployment (Choose One)

#### Option A: Local Network (Simple)
- [ ] Get your local IP address: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
- [ ] Start dev server: `npm run dev`
- [ ] Test access from another device: `http://YOUR_IP:3000`
- [ ] Ensure firewall allows incoming connections on port 3000
- [ ] Share URL with students: `http://YOUR_IP:3000`

#### Option B: Cloud Deployment (Recommended)
- [ ] Push code to GitHub repository
- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Add environment variables in Vercel settings
- [ ] Deploy and test
- [ ] Share public URL: `https://your-project.vercel.app`

### Game Repository Setup
- [ ] Prepare Neon Runner repository with sabotages
- [ ] Test that all bugs exist
- [ ] Verify fixes work
- [ ] Make repository accessible to students (GitHub/GitLab)
- [ ] Test cloning works
- [ ] Prepare repository URL to share

### Materials Preparation
- [ ] Print or share `student-guide.html` (open in browser and print/save PDF)
- [ ] Prepare repository URL on slides/whiteboard
- [ ] Prepare mission board URL on slides/whiteboard
- [ ] Test all Git commands on a clean clone
- [ ] Prepare demo account for live demonstration

---

## 🎯 Workshop Day Checklist

### 30 Minutes Before Workshop

- [ ] Mission board is running and accessible
- [ ] Test login with a dummy account
- [ ] Test mission claiming/releasing
- [ ] Clear test data from database (optional):
  ```sql
  DELETE FROM users WHERE username LIKE 'test%';
  UPDATE missions SET claimed_by = NULL, claimed_at = NULL;
  ```
- [ ] Game repository URL ready to share
- [ ] Mission board URL ready to share
- [ ] Backup plan if internet/deployment fails

### Workshop Introduction (10 minutes)

- [ ] Welcome students
- [ ] Explain workshop goals:
  - Learn Git basics
  - Find and fix bugs
  - Collaborative workflow
- [ ] Show mission board interface
  - How to login
  - How to browse missions
  - How to claim/complete
- [ ] Share URLs:
  - Mission Board: `___________________________`
  - Game Repo: `___________________________`
- [ ] Quick demo:
  - Login to mission board
  - Claim a simple mission
  - Show game repository
  - Demonstrate one fix

### During Workshop (60-90 minutes)

#### First 15 Minutes
- [ ] Students access mission board
- [ ] Students successfully login
- [ ] Help with any access issues
- [ ] Encourage starting with Anytime missions

#### Middle Period
- [ ] Circulate and help students
- [ ] Check mission board for activity
- [ ] Note common problems
- [ ] Help with git commands
- [ ] Encourage collaboration

#### Common Student Issues
- [ ] Git not installed → Help install
- [ ] Python environment issues → Guide through venv setup
- [ ] Can't see coins/bugs → Guide through detective work
- [ ] Merge conflicts → Explain and help resolve
- [ ] Mission already claimed → Suggest alternatives

### Monitoring Progress

Check mission board periodically:
- [ ] Are missions being claimed?
- [ ] Are students completing them?
- [ ] Any missions stuck with same person too long?
- [ ] Balance of activity across mission types?

Check Supabase dashboard:
- [ ] Number of active users
- [ ] Mission claim activity
- [ ] Any database errors?

### Workshop Wrap-up (10 minutes)

- [ ] Stop accepting new mission claims
- [ ] Quick survey of completions:
  - "Who completed at least 1 mission?"
  - "Who completed 3+ missions?"
  - "Who fixed all the detective bugs?"
- [ ] Show completion statistics from database
- [ ] Highlight achievements
- [ ] Review key Git concepts learned
- [ ] Q&A session
- [ ] Share additional resources

---

## 📊 Quick Stats Queries

Run these in Supabase SQL Editor during/after workshop:

### Total Users
```sql
SELECT COUNT(*) as total_users FROM users;
```

### Active Missions
```sql
SELECT COUNT(*) as active_missions 
FROM missions 
WHERE claimed_by IS NOT NULL;
```

### Completion Stats
```sql
SELECT 
  mission_id,
  title,
  category,
  array_length(completed_by, 1) as completions
FROM missions
WHERE array_length(completed_by, 1) > 0
ORDER BY completions DESC;
```

### Most Active Students
```sql
SELECT 
  username,
  (SELECT COUNT(*) FROM missions WHERE claimed_by = users.username) as active,
  (SELECT COUNT(*) FROM missions WHERE users.username = ANY(completed_by)) as completed
FROM users
ORDER BY completed DESC, active DESC;
```

### Category Breakdown
```sql
SELECT 
  category,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE claimed_by IS NOT NULL) as claimed,
  SUM(array_length(completed_by, 1)) as completions
FROM missions
GROUP BY category;
```

---

## 🆘 Troubleshooting Guide

### Mission Board Issues

**Students can't access URL**
- Check firewall settings
- Verify dev server is running
- Try accessing from your device first
- Check if using correct IP/URL

**Missions not updating**
- Check Supabase connection
- Verify environment variables
- Check browser console for errors
- Try hard refresh (Cmd+Shift+R)

**Database errors**
- Check Supabase dashboard for issues
- Verify RLS policies are correct
- Check SQL logs in Supabase
- Restart dev server

### Git Issues

**Students can't clone**
- Verify repo URL is correct
- Check repo is public or students have access
- Check students have Git installed
- Try HTTPS instead of SSH

**Push rejected**
- Make sure students are on their own branch
- Check they haven't pushed to main/master
- Guide through creating feature branch

**Merge conflicts**
- This is a learning opportunity!
- Show how to resolve conflicts
- Explain what happened
- Practice on a test file if needed

### Game Issues

**Game won't run**
- Check Python installed: `python --version`
- Check virtual environment activated
- Verify requirements installed
- Windows: suggest WSL or Git Bash

**Bugs already fixed**
- Someone may have pushed fixes to main
- Create separate branches for each student
- Or reset repo between workshops

---

## 📝 Post-Workshop Tasks

- [ ] Thank students for participating
- [ ] Collect feedback (informal or survey)
- [ ] Save mission completion data
- [ ] Archive workshop data:
  ```sql
  CREATE TABLE workshop_[date]_backup AS 
  SELECT * FROM missions;
  ```
- [ ] Clean database for next workshop:
  ```sql
  TRUNCATE users, missions;
  ```
- [ ] Document what worked well
- [ ] Document what to improve
- [ ] Update mission descriptions if needed
- [ ] Share additional resources with students

---

## 🎓 Success Metrics

A successful workshop should have:
- ✅ 80%+ students successfully login
- ✅ 70%+ students complete at least 1 mission
- ✅ 40%+ students complete 3+ missions
- ✅ Mix of mission types attempted
- ✅ Students engaged and asking questions
- ✅ Positive feedback on learning experience

---

## 📚 Additional Resources to Share

Share these with students after workshop:
- Git documentation: https://git-scm.com/doc
- Interactive Git tutorial: https://learngitbranching.js.org/
- GitHub guides: https://guides.github.com/
- Pro Git book (free): https://git-scm.com/book/en/v2
- Git cheat sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

## 🔄 For Next Time

**What to improve:**
- [ ] Mission difficulty balance
- [ ] Instructions clarity
- [ ] Time allocation
- [ ] Technical setup issues
- [ ] Student engagement activities

**Ideas for future workshops:**
- Add team challenges
- Create leaderboard
- Add time-based bonuses
- More advanced missions
- Different game/project

---

## 💾 Backup Plans

**If mission board fails:**
- Use shared Google Doc with mission list
- Students manually track progress
- Continue with Git learning using game repo

**If game repo fails:**
- Use simple text file with "bugs"
- Focus on Git commands practice
- Use mission board as primary project

**If internet fails:**
- All work done locally
- Share mission list on paper
- Track progress manually
- Sync to database later

---

**Ready to run a great workshop?** You've got this! 🚀

Print this checklist and check off items as you go.
