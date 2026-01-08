# Luna Lab Landing Page

A modern, interactive landing page built with React, Three.js, and Vite, featuring dynamic 3D elements and a fully integrated contact form with Neon PostgreSQL database.

## ✨ Features

- 🎨 **Modern Design** - Beautiful, responsive UI with dark/light mode
- 🌟 **3D Interactive Hero** - Three.js powered sun/moon animation
- 📝 **Contact Form** - Integrated with Neon PostgreSQL database
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎭 **Smooth Animations** - Framer Motion powered transitions
- 📱 **Fully Responsive** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Neon PostgreSQL account ([sign up here](https://neon.tech))

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd landing-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=your_neon_connection_string_here
   ```

   Get your connection string from [Neon Console](https://console.neon.tech)

4. **Test database connection**

   ```bash
   npm run test-db
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173`

## 📚 Documentation

For complete documentation on the Neon database integration, see:

**[📖 NEON_DATABASE_GUIDE.md](./NEON_DATABASE_GUIDE.md)**

This comprehensive guide includes:

- Complete setup instructions
- Local development guide
- Database schema and queries
- API reference
- Deployment instructions
- Troubleshooting tips
- Security best practices

## 🛠️ Available Scripts

```bash
# Start development (frontend + API server)
npm run dev

# Start only API server
npm run dev:api

# Start only Vite frontend
npm run dev:vite

# Test database connection
npm run test-db

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🗄️ Database

This project uses **Neon PostgreSQL** for storing contact form submissions.

- Serverless PostgreSQL database
- Automatic scaling
- Built-in connection pooling
- Free tier available

See [NEON_DATABASE_GUIDE.md](./NEON_DATABASE_GUIDE.md) for complete database documentation.

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Add Environment Variable**

   - Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string

4. **Deploy!**

## 📦 Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend

- **Neon PostgreSQL** - Database
- **Vercel Serverless Functions** - API (production)
- **Express** - API server (development)

### Development

- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Concurrently** - Run multiple servers

## 📁 Project Structure

```
landing-page/
├── api/                    # Serverless API functions
│   └── contact.ts         # Contact form endpoint (production)
├── database/              # Database files
│   ├── schema.sql        # Database schema
│   └── queries.sql       # Useful SQL queries
├── public/               # Static assets
├── scripts/              # Utility scripts
│   └── test-db.ts       # Database connection test
├── src/
│   ├── components/      # React components
│   │   ├── 3d/         # Three.js components
│   │   ├── Contact.tsx # Contact form
│   │   ├── Hero.tsx    # Hero section
│   │   └── ...
│   ├── data/           # Static data
│   ├── interfaces/     # TypeScript interfaces
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── api-server.js        # Local development API server
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── vite.config.ts       # Vite configuration
├── vercel.json          # Vercel configuration
└── NEON_DATABASE_GUIDE.md  # Complete documentation
```

## 🔒 Security

- ✅ SQL injection protection (parameterized queries)
- ✅ Input validation (client + server)
- ✅ Environment variables for credentials
- ✅ CORS configuration
- ✅ Security logging (IP, user agent)

## 🐛 Troubleshooting

See the [Troubleshooting section](./NEON_DATABASE_GUIDE.md#-troubleshooting) in the complete guide.

Common issues:

- Database connection errors
- Port conflicts
- Environment variable issues
- CORS errors

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues related to:

- **Database**: Check [NEON_DATABASE_GUIDE.md](./NEON_DATABASE_GUIDE.md)
- **Deployment**: See Vercel documentation
- **General**: Open an issue on GitHub

---

**Built with ❤️ using React, Three.js, and Neon PostgreSQL**
