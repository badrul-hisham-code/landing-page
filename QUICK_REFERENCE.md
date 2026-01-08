# 📋 Quick Reference Card

> **Quick commands and links for Luna Lab Landing Page development**

---

## 🚀 Essential Commands

```bash
# Start development (both frontend + API)
npm run dev

# Test database connection
npm run test-db

# Build for production
npm run build
```

---

## 🔗 Important Links

- **Frontend:** http://localhost:5173
- **API Server:** http://localhost:3001
- **Neon Console:** https://console.neon.tech
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 📚 Documentation

- **Complete Guide:** [NEON_DATABASE_GUIDE.md](./NEON_DATABASE_GUIDE.md)
- **Project README:** [README.md](./README.md)

---

## 🗄️ Database

### Connection String Location

```
.env file → DATABASE_URL
```

### View Submissions

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

### Quick Stats

```sql
SELECT COUNT(*) FROM contact_submissions;
```

---

## 🧪 Testing

### Test API Endpoint

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Testing!"}'
```

### Test Health Check

```bash
curl http://localhost:3001/api/health
```

---

## 🐛 Quick Fixes

### Kill Stuck Processes

```bash
lsof -ti:3001 | xargs kill -9  # API server
lsof -ti:5173 | xargs kill -9  # Vite
```

### Restart Everything

```bash
npm run dev
```

---

## 📁 Key Files

| File                         | Purpose                    |
| ---------------------------- | -------------------------- |
| `.env`                       | Database connection string |
| `api-server.js`              | Local API server           |
| `api/contact.ts`             | Production API function    |
| `src/components/Contact.tsx` | Contact form               |
| `vite.config.ts`             | Vite + proxy config        |

---

## ✅ Deployment Checklist

- [ ] Push to GitHub
- [ ] Import to Vercel
- [ ] Add `DATABASE_URL` in Vercel settings
- [ ] Deploy
- [ ] Test production form

---

**For detailed information, see [NEON_DATABASE_GUIDE.md](./NEON_DATABASE_GUIDE.md)**
