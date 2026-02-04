# Database Deployment Checklist

## Vercel Environment Variables
Make sure these are set in Vercel Project Settings → Environment Variables:

1. `NEXT_PUBLIC_SUPABASE_URL` = `https://dycyjgwanumrmwugljba.supabase.co`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5Y3lqZ3dhbnVtcm13dWdsamJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDk3ODUsImV4cCI6MjA4NTcyNTc4NX0.Hn7JAbSVE8CuI0PAhlHN_UwyqgNlgQIjDTkSUMRUc28`

## Database Setup

1. Go to Supabase SQL Editor: https://app.supabase.com/project/dycyjgwanumrmwugljba/sql
2. Run `migrate-database.sql` first (adds new columns to existing missions table)
3. Run `seed-missions.sql` second (populates all 27 missions)

## Testing Database Connection

After deployment:
1. Open browser console
2. Login with a username
3. Check for console logs:
   - "User created successfully" or "User logged in"
   - "Loaded X missions from database"
4. Complete a mission
5. Check for: "Mission completed successfully"
6. Refresh page - mission should still show as completed

## Common Issues

### Issue: Missions show as "Available" after completion
**Fix**: Database not syncing. Check:
- Environment variables are set in Vercel
- Tables exist in Supabase (users, missions)
- Browser console for errors

### Issue: New users not being created
**Fix**: Check users table exists:
```sql
SELECT * FROM users;
```

### Issue: "Error connecting to database"
**Fix**: 
- Verify Supabase URL and key in Vercel
- Check Supabase project is not paused
- Verify RLS policies allow INSERT/UPDATE
