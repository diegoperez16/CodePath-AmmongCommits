# Mission Board - Project Structure

## 📁 Complete File Structure

```
mission-board/
├── app/
│   ├── globals.css          # Global styles with neon theme
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with state management
│
├── components/
│   ├── LoginScreen.tsx      # Username entry screen
│   ├── MissionBoard.tsx     # Main mission board view
│   └── MissionCard.tsx      # Individual mission card component
│
├── lib/
│   ├── database.types.ts    # TypeScript types for Supabase
│   ├── missions.ts          # Mission data definitions (19 missions)
│   └── supabase.ts          # Supabase client configuration
│
├── .env.local.example       # Environment variables template
├── .gitignore              # Git ignore rules
├── database-setup.sql      # Complete SQL setup script
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Main documentation
├── SUPABASE_SETUP.md       # Detailed Supabase setup guide
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── WORKSHOP_GUIDE.md       # Quick start guide for workshop day
```

## 🎯 Key Files Explained

### Core Application Files

**`app/page.tsx`** - Main application logic
- Handles user authentication
- Manages mission state
- Connects to Supabase
- Orchestrates all interactions

**`components/LoginScreen.tsx`** - Login interface
- Collects username
- Validates input
- Neon-themed design

**`components/MissionBoard.tsx`** - Mission dashboard
- Displays all missions
- Category filtering
- User stats
- Header with logout

**`components/MissionCard.tsx`** - Individual mission display
- Shows mission details
- Claim/Release/Complete actions
- Expandable steps
- Status indicators

### Data & Configuration

**`lib/missions.ts`** - Mission definitions
- 19 total missions:
  - 5 Anytime missions (Git basics)
  - 8 Detective missions (Bug finding)
  - 6 Unlocked missions (Advanced features)
- All mission metadata and steps

**`lib/supabase.ts`** - Database connection
- Supabase client initialization
- Type-safe queries

**`lib/database.types.ts`** - TypeScript types
- Database schema types
- Ensures type safety

### Documentation

**`README.md`** - Complete project documentation
- Features overview
- Setup instructions
- Usage guide
- Customization tips

**`SUPABASE_SETUP.md`** - Database setup guide
- Step-by-step Supabase setup
- SQL scripts
- Troubleshooting
- Verification steps

**`WORKSHOP_GUIDE.md`** - Workshop day guide
- Quick start checklist
- Workshop flow recommendations
- Student instructions
- Common issues

**`database-setup.sql`** - Ready-to-run SQL
- Complete database setup
- All tables and indexes
- RLS policies
- Verification queries

## 🎨 Design System

### Colors
- **Primary**: Cyan (#22D3EE)
- **Secondary**: Purple (#A855F7)
- **Accent**: Pink (#EC4899)
- **Background**: Dark gradients (gray-900, purple-900)
- **Text**: White/Gray scale

### Mission Categories
- 🎮 **Anytime** - Green theme
- 🔍 **Detective** - Orange theme
- 🔓 **Unlocked** - Purple theme

### Status Indicators
- 🟢 **Available** - Ready to claim
- 🔵 **Active** - Claimed by user
- 🔴 **Locked** - Claimed by someone else
- ✅ **Completed** - Finished by user

## 🔧 Tech Stack Details

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend
- **Supabase** - PostgreSQL database
- **Row Level Security** - Database policies
- **Real-time** - Automatic updates (can be enabled)

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📊 Database Schema

### Users Table
```sql
users (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP
)
```

### Missions Table
```sql
missions (
  id UUID PRIMARY KEY,
  mission_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('anytime', 'detective', 'unlocked')),
  difficulty TEXT NOT NULL,
  claimed_by TEXT,
  claimed_at TIMESTAMP,
  completed_by TEXT[],
  created_at TIMESTAMP
)
```

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔐 Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anon/public key
```

## 📦 Dependencies

### Production
- `next`: ^14.1.0
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `@supabase/supabase-js`: ^2.39.3
- `lucide-react`: ^0.312.0

### Development
- `typescript`: ^5
- `@types/node`: ^20
- `@types/react`: ^18
- `@types/react-dom`: ^18
- `tailwindcss`: ^3.3.0
- `autoprefixer`: ^10.0.1
- `postcss`: ^8
- `eslint`: ^8
- `eslint-config-next`: 14.1.0

## 🎓 Features Implemented

### User Management
- ✅ Username-based login
- ✅ LocalStorage session persistence
- ✅ User statistics tracking
- ✅ Logout functionality

### Mission Management
- ✅ 19 pre-defined missions
- ✅ Category filtering (All, Anytime, Detective, Unlocked)
- ✅ Mission claiming/locking
- ✅ Mission release
- ✅ Mission completion tracking
- ✅ Multiple completions per mission

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Neon/cyberpunk theme
- ✅ Expandable mission details
- ✅ Real-time status updates
- ✅ Loading states
- ✅ Error handling

### Database
- ✅ Supabase PostgreSQL integration
- ✅ Row Level Security policies
- ✅ Optimized indexes
- ✅ Atomic operations
- ✅ Array operations for completed_by

## 🔄 Data Flow

1. **User Login**
   - Username entered → Saved to Supabase users table
   - Session stored in localStorage
   - Redirected to mission board

2. **Mission Claim**
   - User clicks "Claim Mission"
   - Mission row updated: `claimed_by = username, claimed_at = now()`
   - UI updates to show "Active" status
   - Mission locked for other users

3. **Mission Complete**
   - User clicks "Complete"
   - Username added to `completed_by` array
   - Mission released: `claimed_by = null`
   - Available for others to claim again

4. **Real-time Sync**
   - App loads latest mission state on mount
   - Can add Supabase real-time subscriptions for live updates

## 🎯 Customization Points

### Add New Missions
Edit `lib/missions.ts` - add to MISSIONS array

### Change Theme Colors
Edit `tailwind.config.ts` and component classes

### Modify Database Schema
Update `database-setup.sql` and `lib/database.types.ts`

### Add New Features
- Mission prerequisites
- Team assignments
- Time limits
- Leaderboards
- Chat/comments

## 📈 Scalability Notes

Current setup supports:
- ✅ 50+ concurrent users (Supabase free tier)
- ✅ Thousands of mission completions
- ✅ Multiple workshops

For larger scale:
- Upgrade Supabase plan
- Add caching layer
- Implement real-time subscriptions
- Add database connection pooling

## 🔒 Security Considerations

Current setup is permissive (workshop use):
- RLS policies allow all operations
- No authentication required
- Username-only identification

For production:
- Add proper authentication
- Restrict RLS policies
- Validate inputs
- Add rate limiting

## 📝 Notes

- Mission data is dual-source: defined in code (`missions.ts`) and stored in database
- Database takes precedence for claim/complete status
- App works offline with fallback to local data
- All timestamps in UTC

---

**Ready to customize?** Start by editing missions in `lib/missions.ts`!
