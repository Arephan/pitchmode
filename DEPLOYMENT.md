# Deploy to Vercel + Supabase

## 1. Create Free Supabase Account
- Go to https://supabase.com
- Create a free project
- Copy API keys

## 2. Deploy to Vercel
```bash
vercel --prod
```

Or via https://vercel.com/new?repo=Arephan/pitchmode

## 3. Add Environment Variables
In Vercel dashboard, set:
- `SUPABASE_URL` = your Supabase URL
- `SUPABASE_KEY` = your Supabase anon key

## 4. Done!
Your app is live and ready to use! 🚀
