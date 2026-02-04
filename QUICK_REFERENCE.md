# Quick Reference - Commands & URLs

## 🚀 Quick Start Commands

```bash
# Navigate to project
cd mission-board

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Then edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Access at: http://localhost:3000
```

---

## 🗄️ Supabase Quick Setup

1. **Create project** → [supabase.com](https://supabase.com)
2. **Get credentials** → Settings > API
3. **Run SQL** → SQL Editor > Paste from `database-setup.sql`
4. **Verify** → Table Editor (check users & missions tables)

---

## 🔧 Essential Git Commands (For Students)

```bash
# Clone repository
git clone <repo-url>
cd Neon-Runner-Artifact-Heist

# Create your branch
git checkout -b yourname-fixes

# See commit history
git log --oneline
git log --graph --oneline --all

# Search for commits
git log --oneline | grep -i "keyword"

# View a specific commit
git show <commit-hash>

# Make changes and commit
git add .
git commit -m "Fix: description"
git push origin yourname-fixes
```

---

## 🎮 Game Commands (For Students)

```bash
# Setup (first time only)
python -m venv venv
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate     # Windows

pip install -r requirements.txt

# Run game
python main.py

# Controls: WASD or Arrow Keys, Q to quit
```

---

## 📊 Useful SQL Queries

### View all users
```sql
SELECT * FROM users ORDER BY created_at DESC;
```

### See mission status
```sql
SELECT 
  mission_id, 
  title, 
  category, 
  claimed_by, 
  array_length(completed_by, 1) as completions
FROM missions
ORDER BY category, mission_id;
```

### Find active missions
```sql
SELECT mission_id, title, claimed_by, claimed_at
FROM missions
WHERE claimed_by IS NOT NULL
ORDER BY claimed_at DESC;
```

### Count completions by student
```sql
SELECT 
  username,
  (SELECT COUNT(*) FROM missions WHERE username = ANY(completed_by)) as completed
FROM users
ORDER BY completed DESC;
```

### Reset missions (between workshops)
```sql
UPDATE missions 
SET claimed_by = NULL, 
    claimed_at = NULL;
```

### Clear all data
```sql
TRUNCATE users, missions CASCADE;
```

---

## 🌐 Important URLs

### Development
- **Local**: `http://localhost:3000`
- **Local Network**: `http://[YOUR_IP]:3000`

### Documentation
- **Supabase**: [supabase.com](https://supabase.com)
- **Next.js**: [nextjs.org](https://nextjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Git Docs**: [git-scm.com/doc](https://git-scm.com/doc)

### Deployment
- **Vercel**: [vercel.com](https://vercel.com)
- **Netlify**: [netlify.com](https://netlify.com)

---

## 📱 Student Access

Share with students:
```
Mission Board: [YOUR_URL_HERE]
Game Repo:     [REPO_URL_HERE]
```

Student Guide: Open `student-guide.html` in browser

---

## 🆘 Troubleshooting Quick Fixes

### Mission board won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database connection fails
```bash
# Check .env.local exists and has correct values
cat .env.local

# Restart dev server
# Ctrl+C, then npm run dev
```

### Port 3000 in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Students can't connect
```bash
# Find your IP
ifconfig | grep "inet "  # Mac/Linux
ipconfig                 # Windows

# Share: http://YOUR_IP:3000
```

---

## 📋 Pre-Workshop Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] `.env.local` configured
- [ ] App runs: `npm run dev`
- [ ] Test login works
- [ ] Test mission claim works
- [ ] Game repo prepared
- [ ] URLs ready to share

---

## 🎯 During Workshop

**Monitor:**
- Mission board activity
- Supabase dashboard
- Student questions

**Help with:**
- Git command syntax
- Python/virtual env issues
- Mission instructions
- Merge conflicts

---

## 📈 Success Metrics

Quick checks:
```sql
-- Total users
SELECT COUNT(*) FROM users;

-- Active missions
SELECT COUNT(*) FROM missions WHERE claimed_by IS NOT NULL;

-- Total completions
SELECT SUM(array_length(completed_by, 1)) FROM missions;
```

---

## 🔐 Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

Get these from: Supabase Dashboard → Settings → API

---

## 📞 Quick Links to Docs

In this project:
- `README.md` - Complete documentation
- `SUPABASE_SETUP.md` - Database setup
- `WORKSHOP_GUIDE.md` - Workshop day guide
- `INSTRUCTOR_CHECKLIST.md` - Step-by-step checklist
- `OVERVIEW.md` - System architecture
- `PROJECT_STRUCTURE.md` - File organization
- `student-guide.html` - Student reference

---

## 💡 Pro Tips

1. **Test everything** before the workshop
2. **Have backup plan** if tech fails
3. **Start with simple missions** to build confidence
4. **Encourage collaboration** between students
5. **Celebrate completions** publicly
6. **Be patient** with Git newcomers
7. **Make it fun!** It's a game after all

---

## 🎉 One-Liner Start

```bash
cd mission-board && npm install && cp .env.local.example .env.local && npm run dev
```
(Remember to edit `.env.local` first!)

---

**Print this page for quick reference during your workshop!** 📄
