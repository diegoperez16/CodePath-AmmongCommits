# Git Workshop Mission Board - Overview

## 🎯 What Is This?

A web-based mission board system for teaching Git to software engineering students through hands-on debugging of a terminal game.

**The Concept:**
- Students login with a username
- Browse and claim missions from a visual board
- Work on missions in the Neon Runner game repository
- Mark missions complete when done
- Mission claiming prevents duplicated effort

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        STUDENTS                              │
│  (Access via web browser from any device)                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP/HTTPS
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   MISSION BOARD WEB APP                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Login Screen │→ │ Mission Board│→ │Mission Cards │     │
│  │   (React)    │  │   (React)    │  │   (React)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Next.js 14 + TypeScript + Tailwind CSS                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Supabase Client SDK
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE DATABASE                          │
│                                                              │
│  ┌──────────────────┐      ┌──────────────────┐           │
│  │  users table     │      │  missions table  │           │
│  ├──────────────────┤      ├──────────────────┤           │
│  │ id: UUID         │      │ id: UUID         │           │
│  │ username: TEXT   │      │ mission_id: TEXT │           │
│  │ created_at       │      │ title: TEXT      │           │
│  └──────────────────┘      │ description      │           │
│                             │ category         │           │
│                             │ difficulty       │           │
│                             │ claimed_by       │           │
│                             │ claimed_at       │           │
│                             │ completed_by[]   │           │
│                             └──────────────────┘           │
│                                                              │
│  PostgreSQL with Row Level Security                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎮 User Flow

```
1. STUDENT ARRIVES
   ↓
2. OPENS MISSION BOARD URL
   ↓
3. ENTERS USERNAME
   ↓ (Saved to Supabase + localStorage)
   ↓
4. SEES MISSION BOARD
   │
   ├─→ Browse by category (All/Anytime/Detective/Unlocked)
   ├─→ View mission details
   ├─→ See which missions are claimed
   └─→ See their active missions
   ↓
5. CLAIMS A MISSION
   ↓ (Mission locked in database)
   ↓
6. WORKS ON MISSION
   │ (In separate Git repository)
   ├─→ Clones game repo
   ├─→ Creates branch
   ├─→ Follows mission steps
   ├─→ Makes fixes
   ├─→ Tests changes
   └─→ Commits code
   ↓
7. MARKS MISSION COMPLETE
   ↓ (Added to completed_by array, mission unlocked)
   ↓
8. REPEAT FROM STEP 4
```

---

## 📊 Mission Structure

### Mission Categories (3 types)

```
🎮 ANYTIME MISSIONS (5 total)
├─ Focus: Git basics
├─ Difficulty: Beginner
├─ Can be done in any order
└─ Examples:
   ├─ Clone and run
   ├─ Create branch
   ├─ Make commits
   ├─ Explore history
   └─ Edit README

🔍 DETECTIVE MISSIONS (8 total)
├─ Focus: Bug hunting with Git
├─ Difficulty: Easy to Medium
├─ Requires Git investigation skills
└─ Examples:
   ├─ Fix invisible coins
   ├─ Slow down fast enemies
   ├─ Fix reversed controls
   ├─ Repair broken scoring
   └─ Enable collision detection

🔓 UNLOCKED MISSIONS (6 total)
├─ Focus: Adding new features
├─ Difficulty: Medium to Advanced
├─ Creative coding challenges
└─ Examples:
   ├─ Add power-up system
   ├─ Create high score persistence
   ├─ Design new enemy types
   ├─ Build level progression
   └─ Implement new mechanics
```

### Mission Data Model

```typescript
Mission {
  id: string              // Unique identifier
  mission_id: string      // Human-readable ID (e.g., "detective-1")
  title: string          // Display name
  description: string    // Brief description
  category: enum         // anytime | detective | unlocked
  difficulty: string     // Beginner | Easy | Medium | Advanced | Challenge
  badge: string          // Emoji icon
  whatYouLearn: string  // Learning objective
  steps: string[]        // Step-by-step instructions
  claimedBy: string?     // Username of current claimer
  claimedAt: datetime?   // When claimed
  completedBy: string[]  // Array of usernames who completed
}
```

---

## 🎨 User Interface

### Login Screen
```
┌─────────────────────────────────────────┐
│                                         │
│              NEON RUNNER                │
│         (animated gradient text)        │
│                                         │
│     Git Workshop Mission Board         │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Choose Your Username             │ │
│  │  [________________]  detective_001│ │
│  │                                    │ │
│  │     [Start Mission]                │ │
│  └───────────────────────────────────┘ │
│                                         │
│  🔍 Find bugs • 🛠️ Fix code • 📚 Learn Git │
│                                         │
└─────────────────────────────────────────┘
```

### Mission Board
```
┌─────────────────────────────────────────────────────────────┐
│ 🎯 Mission Board          Active: 2 | Complete: 5 | @username│
├─────────────────────────────────────────────────────────────┤
│ [All] [🎮 Anytime] [🔍 Detective] [🔓 Unlocked]             │
├─────────────────────────────────────────────────────────────┤
│                  Your Active Missions                        │
│ ┌────────────┐ ┌────────────┐                              │
│ │ 💰 Detective│ │ 🏃 Detective│                              │
│ │ Invisible  │ │ Fast       │                              │
│ │ Coins      │ │ Enemies    │                              │
│ │ [Complete] │ │ [Complete] │                              │
│ │ [Release]  │ │ [Release]  │                              │
│ └────────────┘ └────────────┘                              │
├─────────────────────────────────────────────────────────────┤
│                    All Missions                              │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│ │ ⚙️ Anytime │ │ 🌿 Anytime │ │ 👾 Anytime │              │
│ │ Clone &    │ │ Make a     │ │ Change     │              │
│ │ Run        │ │ Branch     │ │ Character  │              │
│ │ [Claim]    │ │ 🔒 Locked  │ │ ✅ Done    │              │
│ └────────────┘ └────────────┘ └────────────┘              │
│ ... more missions ...                                        │
└─────────────────────────────────────────────────────────────┘
```

### Mission Card States

```
┌─────────────────┐
│ 💰 Detective    │  AVAILABLE
│ Invisible Coins │  (Green border, can claim)
│ Easy            │
│ Learn: git log  │
│                 │
│  [Claim Mission]│
└─────────────────┘

┌─────────────────┐
│ 💰 Detective    │  ACTIVE
│ Invisible Coins │  (Cyan border, claimed by you)
│ Easy  🔵 Active │
│ Learn: git log  │
│                 │
│  [Complete]     │
│  [Release]      │
└─────────────────┘

┌─────────────────┐
│ 💰 Detective    │  LOCKED
│ Invisible Coins │  (Red border, someone else working)
│ Easy  🔒 Locked │
│ Claimed: bob    │
│                 │
│    [Locked]     │
└─────────────────┘

┌─────────────────┐
│ 💰 Detective    │  COMPLETED
│ Invisible Coins │  (Green bg, you finished it)
│ Easy  ✅ Done   │
│ Learn: git log  │
│                 │
│  [Completed!]   │
└─────────────────┘
```

---

## 🔧 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend/Database
- **Supabase** - PostgreSQL database as a service
- **Row Level Security** - Database access control
- **PostgreSQL** - Relational database

### Deployment Options
- **Local Network** - Run on instructor's machine
- **Vercel** - Cloud deployment (recommended)
- **Netlify** - Alternative cloud deployment

---

## 🚀 Deployment Scenarios

### Scenario 1: Small Classroom (Local)
```
Instructor's Laptop
├─ Runs: npm run dev
├─ IP: 192.168.1.100
└─ Students access: http://192.168.1.100:3000

Pros: No deployment needed, fast setup
Cons: Requires local network, instructor machine must stay on
```

### Scenario 2: Large Workshop (Cloud)
```
Vercel Deployment
├─ URL: https://git-workshop-missions.vercel.app
├─ Always available
└─ Students access from anywhere

Pros: Professional, reliable, accessible anywhere
Cons: Requires deployment setup, public URL
```

---

## 📈 Scaling Considerations

### Current Capacity
- **Students**: 50+ concurrent (Supabase free tier)
- **Missions**: Unlimited
- **Completions**: Unlimited
- **Storage**: 500MB database (plenty)

### Performance Optimizations
- Mission data cached in app
- Database indexes on frequently queried fields
- LocalStorage for user sessions
- Efficient array operations for completed_by

### For Larger Scale (100+ students)
- Upgrade Supabase plan
- Add Redis caching layer
- Implement Supabase real-time subscriptions
- Add CDN for static assets

---

## 🔐 Security Model

### Current (Workshop Mode)
- ✅ Username-only login (no passwords)
- ✅ RLS policies allow all operations
- ✅ Simple and fast for learning
- ⚠️ Not suitable for production

### For Production Use
- Add proper authentication (email/password)
- Restrict RLS policies by user
- Add input validation
- Implement rate limiting
- Add CSRF protection

---

## 📚 Learning Outcomes

By using this system, students learn:

### Git Skills
- ✅ Clone repositories
- ✅ Create and switch branches
- ✅ Make commits with messages
- ✅ Push to remote
- ✅ Read git history (log, show)
- ✅ Search commits (grep)
- ✅ Understand collaborative workflows

### Debugging Skills
- ✅ Use version control to find bugs
- ✅ Analyze commit history
- ✅ Identify code changes
- ✅ Test fixes systematically
- ✅ Document changes

### Soft Skills
- ✅ Following structured instructions
- ✅ Problem-solving
- ✅ Working with existing codebases
- ✅ Self-directed learning
- ✅ Asking for help when needed

---

## 🎯 Workshop Formats

### 90-Minute Sprint
- Focus: Git basics + 2-3 easy bugs
- Missions: Anytime 1-3, Detective 1-3
- Goal: Comfortable with Git commands

### 2-Hour Standard
- Focus: Balanced mix
- Missions: All Anytime, 4-5 Detective
- Goal: Confident bug hunting with Git

### 3-Hour Deep Dive
- Focus: Complete experience
- Missions: All categories
- Goal: Add new features to game

### Multi-Day Course
- Day 1: Git basics (Anytime)
- Day 2: Bug hunting (Detective)
- Day 3: Feature development (Unlocked)
- Goal: Complete mastery

---

## 💡 Customization Ideas

### For Your Workshop
- Adjust mission difficulty
- Add workshop-specific missions
- Change game/project
- Add team challenges
- Create custom categories
- Add prerequisites between missions
- Implement point system
- Add leaderboard
- Create mission chains

### Technical Extensions
- Real-time updates (Supabase subscriptions)
- Chat system
- Code snippet sharing
- Automated testing integration
- Git webhook integration
- Progress analytics dashboard
- Export completion certificates

---

## 🎉 Success Stories

This system helps students:
- Learn Git practically, not theoretically
- See immediate results of their work
- Work at their own pace
- Choose missions that interest them
- Collaborate without conflicts
- Build confidence with version control
- Have fun while learning!

**The gamification aspect makes Git learning engaging and memorable!**

---

## 📞 Support & Resources

- **Setup Issues**: Check SUPABASE_SETUP.md
- **Workshop Day**: See INSTRUCTOR_CHECKLIST.md
- **Student Questions**: Share student-guide.html
- **Technical Docs**: See README.md
- **Project Structure**: See PROJECT_STRUCTURE.md

---

**Ready to revolutionize Git education?** 🚀

This mission board transforms Git from a scary command-line tool into an exciting adventure game!
