# Demo Account Seeding

This project includes a backend function to seed realistic demo data for testing and demonstrations.

## Demo Account

- **Email**: `brandon+demo@piplabs.xyz`
- **Purpose**: Show a fully populated garden, challenges, earnings, and insights
- **Normal account**: `brandon@piplabs.xyz` remains a normal empty account

## How to Seed Demo Data

### Step 1: Create the Account

Sign up in the app using `brandon+demo@piplabs.xyz`. Complete the onboarding flow normally.

### Step 2: Call the Seed Endpoint

Make a POST request to the seed function with the secret header:

```bash
curl -X POST \
  'https://lzbrlhutuppqvozbjvao.supabase.co/functions/v1/seed-demo-user' \
  -H 'Content-Type: application/json' \
  -H 'x-seed-secret: YOUR_DEMO_SEED_SECRET' \
  -d '{"email": "brandon+demo@piplabs.xyz"}'
```

Replace `YOUR_DEMO_SEED_SECRET` with the actual secret value stored in Supabase secrets.

### Step 3: Log In and Demo

Log in with the demo account credentials. You should see:

- **Profile**: First name "Brandon"
- **Garden**: 3 plants at different growth stages
- **Challenges**: 8 completed sessions over the past 14 days
- **Insights**: Unlocked with weekly recap data
- **Earnings**: Points and multipliers from completed challenges

## Reset Demo Data

To reset the demo account to fresh seeded state, simply call the seed endpoint again. It will:

1. Wipe all existing data for that user (plants, sessions, insights)
2. Re-seed with fresh demo data

This is **idempotent** — calling it multiple times produces the same result.

## Seeded Data Summary

| Data Type | Count | Details |
|-----------|-------|---------|
| Profile | 1 | first_name = "Brandon" |
| Plants | 3 | Stages 7 (fruit), 6 (flower), 4 (leafy) |
| Challenge Sessions | 8 | Spread over 14 days, various challenges |
| Weekly Insights | 1 | Current week with headline and patterns |
| Total Points | 343 | Accumulated from all sessions |

## Security

- The endpoint requires the `x-seed-secret` header matching the `DEMO_SEED_SECRET` environment variable
- Only works for existing accounts (won't create new users)
- Uses service role key internally to bypass RLS for seeding

## Notes

- This seeding is for **development/demo purposes only**
- Production users are unaffected
- The app behaves identically for all users; demo account just has pre-populated data
