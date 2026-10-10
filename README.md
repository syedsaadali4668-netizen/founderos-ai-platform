# FounderOS

Autonomous AI co-founder SaaS for solo entrepreneurs.

## Stack
React + Tailwind + Vite, Vercel serverless `/api`, Gemini 2.5 Flash with Google Search grounding, Tavily, Neon PostgreSQL, Clerk, Recharts.

## Setup

```bash
npm install
cp .env.example .env
```

Add:

```env
GEMINI_API_KEY=
TAVILY_API_KEY=
DATABASE_URL=
CLERK_SECRET_KEY=
VITE_CLERK_PUBLISHABLE_KEY=
```

## Database

Open Neon SQL editor and run:

```sql
-- paste schema.sql
```

## Local run

```bash
npm run dev
```

Open `http://localhost:5173`.

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add all environment variables.
4. Deploy.

## Routes

- `/api/startup/create`
- `/api/user/startups`
- `/api/startup/[id]/validate`
- `/api/startup/[id]/icp`
- `/api/startup/[id]/gtm`
- `/api/startup/[id]/revenue`
- `/api/startup/[id]/investors`
- `/api/startup/[id]/briefing`
- `/api/startup/[id]/vitals`

## Notes

The agents call Tavily for research where specified and Gemini for structured JSON. Gemini is configured with `googleSearch` grounding tool.
