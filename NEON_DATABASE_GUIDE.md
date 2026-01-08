# 🚀 Neon Database Integration - Complete Guide

> **Complete documentation for integrating Neon PostgreSQL with your Luna Lab Landing Page contact form**

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [What Was Done](#-what-was-done)
3. [Local Development](#-local-development)
4. [Database Setup](#-database-setup)
5. [Testing](#-testing)
6. [Deployment](#-deployment)
7. [API Reference](#-api-reference)
8. [Database Schema](#-database-schema)
9. [Troubleshooting](#-troubleshooting)
10. [Security](#-security)
11. [SQL Queries](#-useful-sql-queries)

---

## 🎯 Quick Start

### 1. Add Your Neon Connection String

Open the `.env` file and add your Neon connection string:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

**Get it from:** [Neon Console](https://console.neon.tech) → Your Project → Production Branch → Connection String

### 2. Start Development

```bash
npm run dev
```

This starts both:

- 🎨 Frontend (Vite) on `http://localhost:5173`
- 📡 API Server (Express) on `http://localhost:3001`

### 3. Test the Form

1. Open `http://localhost:5173` in your browser
2. Navigate to the contact section
3. Fill out and submit the form
4. Check the terminal for: `✅ Contact form submission saved: ID X`

### 4. View Submissions

Go to [Neon Console](https://console.neon.tech) → SQL Editor:

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

---

## 📦 What Was Done

### Files Created

#### Configuration Files

- ✅ `.env` - Store your Neon connection string
- ✅ `.env.example` - Template for environment variables
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.vercelignore` - Files to exclude from deployment

#### API & Backend

- ✅ `api/contact.ts` - Serverless function for production (Vercel)
- ✅ `api-server.js` - Express server for local development
- ✅ Validates form data
- ✅ Creates database table automatically
- ✅ Inserts submissions into Neon
- ✅ Returns success/error responses

#### Database Files

- ✅ `database/schema.sql` - Database schema reference
- ✅ `database/queries.sql` - Useful SQL queries

#### Scripts & Tools

- ✅ `scripts/test-db.ts` - Test database connection
- ✅ Added `npm run test-db` command

#### Updated Files

- ✅ `src/components/Contact.tsx` - Submits to API endpoint
- ✅ `.gitignore` - Added .env files for security
- ✅ `package.json` - Added scripts and dependencies
- ✅ `vite.config.ts` - Added proxy configuration

### Packages Installed

```json
{
  "dependencies": {
    "@neondatabase/serverless": "^1.0.2",
    "dotenv": "^17.2.3",
    "express": "^4.x.x",
    "cors": "^2.x.x"
  },
  "devDependencies": {
    "@vercel/node": "^5.5.16",
    "tsx": "^4.x.x",
    "concurrently": "^8.x.x"
  }
}
```

---

## 💻 Local Development

### How It Works

The local development setup uses a dual-server architecture:

```
Browser (localhost:5173)
    ↓
Vite Dev Server
    ↓ (proxy /api/*)
Express API Server (localhost:3001)
    ↓
Neon PostgreSQL Database
```

### Starting the Servers

```bash
# Start both servers (recommended)
npm run dev

# Start only API server
npm run dev:api

# Start only Vite frontend
npm run dev:vite
```

### What You'll See

When you run `npm run dev`:

```
[0] 🚀 API Server running on http://localhost:3001
[0] 📡 Contact endpoint: http://localhost:3001/api/contact
[0] 💚 Health check: http://localhost:3001/api/health
[1]
[1]   VITE v7.x.x  ready in xxx ms
[1]
[1]   ➜  Local:   http://localhost:5173/
```

When someone submits the form:

```
[0] ✅ Contact form submission saved: ID 1
```

### Why Two Servers?

- **Vite** doesn't support serverless API routes in development
- **Express server** handles `/api/contact` locally
- **Vite proxy** forwards API requests to Express
- **Production** uses Vercel serverless functions instead

---

## 🗄️ Database Setup

### Neon PostgreSQL Integration

This project uses [Neon](https://neon.tech) as a serverless PostgreSQL database.

### Environment Variables

#### Local Development

Create/edit `.env` file:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

#### Production (Vercel)

1. Go to Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Neon connection string
   - **Environment**: Production (and Preview if needed)

### Database Table

The table is **automatically created** on first form submission:

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);
```

### Manual Setup (Optional)

If you want to create the table manually, run in Neon SQL Editor:

```sql
-- Create table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
ON contact_submissions(email);

-- Create a view for recent submissions
CREATE OR REPLACE VIEW recent_contact_submissions AS
SELECT
  id,
  name,
  email,
  LEFT(message, 100) || '...' as message_preview,
  created_at,
  ip_address
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 50;
```

---

## 🧪 Testing

### Test Database Connection

```bash
npm run test-db
```

You should see:

- ✅ Connection successful
- Database information
- Table status
- Submission count

### Test the Contact Form

1. Start dev server: `npm run dev`
2. Open `http://localhost:5173`
3. Navigate to contact section
4. Fill out the form
5. Submit and check terminal for success message

### Test API Directly

```bash
# Test contact endpoint
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Testing the API!"}'

# Test health check
curl http://localhost:3001/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": 1,
    "submittedAt": "2026-01-08T14:08:58.000Z"
  }
}
```

---

## 🚀 Deployment

### Deploying to Vercel

#### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add DATABASE_URL
# Paste your Neon connection string when prompted

# Deploy to production
vercel --prod
```

#### Option 2: Using Vercel Dashboard

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Add Neon database integration"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variable**

   - Go to **Settings** → **Environment Variables**
   - Add:
     - **Name**: `DATABASE_URL`
     - **Value**: Your Neon connection string
     - **Environment**: Production (and Preview)

4. **Deploy!**
   - Vercel will automatically build and deploy
   - Your API will work at `https://your-domain.vercel.app/api/contact`

### Production vs Development

| Feature    | Local Development | Production (Vercel)    |
| ---------- | ----------------- | ---------------------- |
| Frontend   | Vite dev server   | Static build           |
| API        | Express server    | Serverless function    |
| Database   | Neon (same)       | Neon (same)            |
| URL        | localhost:5173    | your-domain.vercel.app |
| Hot Reload | ✅ Yes            | ❌ No (build required) |

---

## 📡 API Reference

### POST /api/contact

Submit a contact form message.

#### Request

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

#### Success Response (200)

```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": 1,
    "submittedAt": "2026-01-08T14:08:58.000Z"
  }
}
```

#### Error Responses

**Validation Error (400)**

```json
{
  "error": "Validation error",
  "message": "Name, email, and message are required"
}
```

**Server Error (500)**

```json
{
  "error": "Server error",
  "message": "Failed to save your message. Please try again later.",
  "details": "Error message (development only)"
}
```

#### Validation Rules

- **name**: Required, minimum 2 characters
- **email**: Required, valid email format
- **message**: Required, minimum 10 characters

---

## 🗃️ Database Schema

### Table: contact_submissions

| Column       | Type         | Constraints   | Description                 |
| ------------ | ------------ | ------------- | --------------------------- |
| `id`         | SERIAL       | PRIMARY KEY   | Auto-incrementing ID        |
| `name`       | VARCHAR(255) | NOT NULL      | Submitter's name            |
| `email`      | VARCHAR(255) | NOT NULL      | Submitter's email           |
| `message`    | TEXT         | NOT NULL      | The message content         |
| `created_at` | TIMESTAMP    | DEFAULT NOW() | Submission timestamp        |
| `ip_address` | VARCHAR(45)  | -             | IP address (for security)   |
| `user_agent` | TEXT         | -             | Browser info (for security) |

### Indexes

- `idx_contact_submissions_created_at` - For faster sorting by date
- `idx_contact_submissions_email` - For searching by email

### View: recent_contact_submissions

Shows the 50 most recent submissions with truncated messages:

```sql
SELECT * FROM recent_contact_submissions;
```

---

## 📊 Useful SQL Queries

### Viewing Submissions

```sql
-- Get all submissions (most recent first)
SELECT * FROM contact_submissions
ORDER BY created_at DESC;

-- Get submissions from today
SELECT * FROM contact_submissions
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC;

-- Get submissions from last 7 days
SELECT * FROM contact_submissions
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Get submissions from specific email
SELECT * FROM contact_submissions
WHERE email = 'example@email.com'
ORDER BY created_at DESC;

-- Search messages containing specific text
SELECT * FROM contact_submissions
WHERE message ILIKE '%keyword%'
ORDER BY created_at DESC;
```

### Statistics

```sql
-- Total number of submissions
SELECT COUNT(*) as total_submissions
FROM contact_submissions;

-- Submissions per day (last 30 days)
SELECT
  DATE(created_at) as submission_date,
  COUNT(*) as count
FROM contact_submissions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY submission_date DESC;

-- Most active email addresses
SELECT
  email,
  COUNT(*) as submission_count,
  MAX(created_at) as last_submission
FROM contact_submissions
GROUP BY email
ORDER BY submission_count DESC
LIMIT 10;

-- Submissions by hour of day
SELECT
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as count
FROM contact_submissions
GROUP BY hour
ORDER BY hour;
```

### Export Data

```sql
-- Export to CSV format
SELECT
  id,
  name,
  email,
  message,
  TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as submitted_at,
  ip_address
FROM contact_submissions
ORDER BY created_at DESC;
```

### Maintenance

```sql
-- Delete old submissions (older than 1 year)
-- WARNING: This permanently deletes data!
DELETE FROM contact_submissions
WHERE created_at < CURRENT_DATE - INTERVAL '1 year';

-- Create backup
CREATE TABLE contact_submissions_backup AS
SELECT * FROM contact_submissions;

-- Restore from backup
TRUNCATE contact_submissions;
INSERT INTO contact_submissions
SELECT * FROM contact_submissions_backup;
```

---

## 🐛 Troubleshooting

### "Database connection is not configured"

**Problem:** `DATABASE_URL` environment variable is not set.

**Solution:**

1. Check that `.env` file exists
2. Verify `DATABASE_URL` is set correctly
3. Run `npm run test-db` to verify connection
4. For Vercel, ensure environment variable is set in project settings

### "Failed to save your message"

**Problem:** Database connection or query failed.

**Solutions:**

1. Run `npm run test-db` to check connection
2. Verify your Neon database is active
3. Check Neon Console for database status
4. Review API server logs in terminal
5. Check Vercel function logs for production errors

### JSON Parsing Error

**Problem:** "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

**Solution:**

- This should be fixed with the Express server setup
- Make sure both servers are running (`npm run dev`)
- Check that Vite proxy is configured in `vite.config.ts`
- Verify API server is running on port 3001

### Port Already in Use

**Problem:** Port 3001 or 5173 is already in use.

**Solution:**

```bash
# Kill process on port 3001 (API)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (Vite)
lsof -ti:5173 | xargs kill -9

# Then restart
npm run dev
```

### CORS Errors

**Problem:** Cross-origin request blocked.

**Solution:**

- The API server includes CORS headers
- Check browser console for specific error
- Verify `cors` package is installed
- Check that API server is running

### Form Submits But No Data in Database

**Problem:** Form appears to work but data isn't saved.

**Solutions:**

1. Check terminal for API errors
2. Verify `DATABASE_URL` is correct
3. Run `npm run test-db` to check connection
4. Check Neon Console SQL Editor for data
5. Review API server logs for errors

### Vercel Deployment Issues

**Problem:** Works locally but not in production.

**Solutions:**

1. Verify `DATABASE_URL` is set in Vercel environment variables
2. Check Vercel function logs for errors
3. Ensure `api/contact.ts` is in the repository
4. Verify `vercel.json` configuration is correct
5. Redeploy after adding environment variables

---

## 🔒 Security

### Security Features Implemented

✅ **SQL Injection Protection**

- Uses parameterized queries
- Neon serverless client handles escaping

✅ **Input Validation**

- Client-side validation (React Hook Form + Zod)
- Server-side validation (duplicate checks)
- Email format validation
- Length requirements

✅ **Environment Variables**

- Database credentials not in code
- `.env` file in `.gitignore`
- Separate environments for dev/prod

✅ **CORS Configuration**

- Proper CORS headers
- Controlled access origins

✅ **Security Logging**

- IP address tracking
- User agent logging
- Timestamp recording

### Security Best Practices

#### ⚠️ DO NOT Commit `.env`

The `.env` file is already in `.gitignore`. **Never commit it to Git!**

```bash
# Check if .env is ignored
git status

# If .env appears, add to .gitignore
echo ".env" >> .gitignore
```

#### ⚠️ Use Environment Variables

**Never** hardcode credentials:

```javascript
// ❌ BAD
const sql = neon("postgresql://user:pass@host/db");

// ✅ GOOD
const sql = neon(process.env.DATABASE_URL);
```

#### ⚠️ Validate All Input

Always validate on both client and server:

```javascript
// Client-side (Contact.tsx)
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

// Server-side (api/contact.ts)
if (!name || !email || !message) {
  return res.status(400).json({ error: "Required fields missing" });
}
```

#### ⚠️ Rate Limiting (Optional)

Consider adding rate limiting for production:

```javascript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

app.use("/api/contact", limiter);
```

---

## 📚 Additional Resources

### Documentation

- [Neon Documentation](https://neon.tech/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Tools

- [Neon Console](https://console.neon.tech) - Manage your database
- [Vercel Dashboard](https://vercel.com/dashboard) - Manage deployments
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - SQL reference

---

## ✅ Checklist

### Initial Setup

- [ ] Add Neon connection string to `.env`
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run test-db` to verify connection
- [ ] Start dev server with `npm run dev`

### Testing

- [ ] Test contact form submission
- [ ] Check terminal for success message
- [ ] Verify data in Neon Console
- [ ] Test API endpoint directly with curl

### Deployment

- [ ] Push code to GitHub
- [ ] Import project to Vercel
- [ ] Add `DATABASE_URL` environment variable in Vercel
- [ ] Deploy and test production form

### Maintenance

- [ ] Regularly check Neon Console for submissions
- [ ] Monitor Vercel function logs
- [ ] Backup database periodically
- [ ] Review and clean old submissions

---

## 🎉 Summary

Your contact form is now fully integrated with Neon PostgreSQL!

### What Happens When Someone Submits:

1. ✅ Form validates input (React Hook Form + Zod)
2. ✅ Data sent to `/api/contact`
3. ✅ API validates again (server-side)
4. ✅ Data saved to Neon database
5. ✅ User sees success message
6. ✅ You can view submissions in Neon Console

### Architecture:

**Local Development:**

```
Browser → Vite (5173) → Proxy → Express API (3001) → Neon DB
```

**Production (Vercel):**

```
Browser → Vercel CDN → Serverless Function → Neon DB
```

### Quick Commands:

```bash
npm run dev        # Start development (both servers)
npm run test-db    # Test database connection
npm run build      # Build for production
npm run preview    # Preview production build
```

---

**Status:** ✅ Ready to use!  
**Created:** 2026-01-08  
**Integration:** Neon PostgreSQL + Vercel Serverless Functions  
**Local Dev:** Express + Vite Proxy

---

**Need help?** Review the [Troubleshooting](#-troubleshooting) section or check the terminal logs for error messages.
