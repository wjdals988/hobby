# hobby

Extreme reaction speed test built with Next.js App Router and Tailwind CSS.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Add environment variables if you want persistent rankings:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

## Persistent ranking on Vercel

This project now uses Redis for ranking persistence in production.

- On Vercel, install a Redis integration from the Marketplace.
- The recommended path is Upstash Redis.
- Make sure these environment variables are available in your project:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

If those variables are missing, the app falls back to in-memory ranking storage for local development only.
