# Deploy to Vercel (Shared Supabase)

## 1. ONE-TIME SETUP: Create Supabase Project

Go to https://supabase.com → Create free project

Then run this SQL in Supabase SQL Editor:
```sql
-- Copy all SQL from unified-schema.sql in the repo
```

## 2. Deploy ALL Apps to Vercel

For EACH app:
```bash
vercel --prod
```

Or click: https://vercel.com/new?repo=Arephan/[app-name]

## 3. Add SHARED Environment Variables

In Vercel dashboard for EACH app, set:
```
SUPABASE_URL = https://xxxx.supabase.co (same for all!)
SUPABASE_KEY = eyJhbGc... (same for all!)
```

## Why This Works:
- All 8 apps share ONE Supabase database
- Each app uses its own table (recipes, videos, posts, etc)
- Cost: $0 forever ✅
- 500MB database shared across all apps

That's it! All 8 apps now use the same backend.
