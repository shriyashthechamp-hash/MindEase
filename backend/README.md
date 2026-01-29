# MindEase Backend

Production-grade backend for the MindEase mental wellness platform. Built with Node.js, Express, TypeScript, and PostgreSQL (via Prisma).

## Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: Supabase Auth (JWT Verification)
- **Payments**: Razorpay
- **Security**: Helmet, Rate Limiting, CORS

## Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `SUPABASE_URL` & `SUPABASE_ANON_KEY`
   - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```

## API Overview

### Authentication
- Protected routes require `Authorization: Bearer <token>` (Supabase JWT).

### Moods
- `POST /api/moods`: Log a mood check-in.
- `GET /api/moods`: Get history.

### Community
- `GET /api/community`: Get anonymous feed.
- `POST /api/community`: Create a post.
- `POST /api/community/react`: React to a post.

### Psychologists & Sessions
- `GET /api/psychologists`: List verified psychologists.
- `POST /api/sessions`: Book a session.
- `GET /api/sessions`: View my sessions.

### Payments
- `POST /api/payments/order`: Initiate Razorpay payment for a session.
- `POST /api/payments/verify`: Verify payment signature and confirm session.

## Deployment (Railway/Render)
1. **Build Command**: `npm run build`
2. **Start Command**: `npm start`
3. **Environment**: Set all variables in the dashboard.

## Security Notes
- Rate limiting is enabled globally (100 req/15min).
- PII is isolated; Community posts are anonymized by default.
