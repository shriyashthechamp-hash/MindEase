# 🌿 MindEase

> **Your Mental Wellness Companion** — Connecting you with verified psychologists and empowering your mental health journey.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Astro](https://img.shields.io/badge/Astro-5.16.0-FF5D01?style=flat&logo=astro)](https://astro.build)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat&logo=express)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Overview

**MindEase** is a modern mental wellness platform designed to make mental health support accessible, approachable, and effective. The platform connects users with verified psychologists, provides mood tracking capabilities, and offers a safe space for mental health conversations.

### 🎯 Mission

To break the stigma around mental health and provide a seamless, user-friendly platform where individuals can:
- Find and connect with qualified mental health professionals
- Track their emotional well-being
- Book therapy sessions (chat, voice, or video)
- Access mental health resources and support

---

## ✨ Features

### 🧑‍⚕️ **Psychologist Directory**
- Browse verified mental health professionals
- Filter by specialization, experience, and ratings
- View detailed profiles with credentials and expertise

### 📅 **Session Booking**
- Schedule therapy sessions with ease
- Choose from multiple session types:
  - 💬 **Chat Sessions** — Text-based therapy
  - 🎙️ **Voice Sessions** — Audio-only consultations
  - 📹 **Video Sessions** — Face-to-face virtual meetings
- Real-time availability checking

### 📊 **Mood Tracking**
- Daily mood check-ins
- Log emotions and notes
- Track mental health patterns over time
- Visualize emotional trends

### 🤖 **AI Chatbot**
- 24/7 mental health support
- Immediate responses to common concerns
- Crisis resource recommendations
- Guided breathing exercises

### 🎨 **Beautiful UI/UX**
- Vibrant pastel theme designed for comfort
- Smooth animations with Framer Motion
- Fully responsive design (mobile, tablet, desktop)
- Accessibility-first approach

### 🔐 **User Onboarding**
- Personalized onboarding flow
- Age-appropriate content (Teen/Adult)
- Privacy-focused data collection

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Astro](https://astro.build) | 5.16.0 | Static site generation & routing |
| [React](https://react.dev) | 19.2.0 | Interactive UI components |
| [TypeScript](https://www.typescriptlang.org) | Latest | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 3.4.18 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 12.23.24 | Animations & transitions |
| [Lucide React](https://lucide.dev) | 0.554.0 | Icon library |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Node.js](https://nodejs.org) | 18+ | Runtime environment |
| [Express](https://expressjs.com) | 5.1.0 | REST API framework |
| [Prisma](https://www.prisma.io) | 5.22.0 | ORM & database toolkit |
| [MySQL](https://www.mysql.com) | 8.0+ | Relational database |

### **DevOps & Deployment**
- **Hosting**: [Vercel](https://vercel.com) (Serverless)
- **Database**: MySQL (PlanetScale, Railway, or any MySQL provider)
- **Version Control**: Git & GitHub

---

## 📁 Project Structure

```
mindease/
├── frontend/                    # Astro frontend application
│   ├── src/
│   │   ├── assets/             # Images, fonts, static files
│   │   ├── components/         # React & Astro components
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── Chatbot.tsx
│   │   │   ├── SessionBooking.tsx
│   │   │   ├── MoodCheckIn.tsx
│   │   │   └── ...
│   │   ├── layouts/            # Page layouts
│   │   ├── pages/              # Route pages
│   │   │   ├── index.astro     # Landing page
│   │   │   ├── dashboard.astro # User dashboard
│   │   │   ├── psychologists.astro
│   │   │   ├── sessions.astro
│   │   │   └── chat.astro
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   ├── astro.config.mjs        # Astro configuration
│   ├── tailwind.config.mjs     # Tailwind configuration
│   ├── tsconfig.json           # TypeScript config
│   ├── package.json
│   └── .env.example            # Environment variables template
│
├── backend/                     # Express backend API
│   ├── api/
│   │   └── index.js            # Main API entry point
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── package.json
│   └── .env.example            # Environment variables template
│
├── vercel.json                 # Vercel deployment config
├── .gitignore
└── README.md                   # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) — [Download](https://nodejs.org)
- **npm** (v9.0.0 or higher) — Comes with Node.js
- **MySQL** (v8.0 or higher) — [Download](https://dev.mysql.com/downloads/) or use a cloud provider
- **Git** — [Download](https://git-scm.com/downloads)

### Optional but Recommended
- **MySQL Workbench** — For database management
- **Postman** or **Insomnia** — For API testing
- **VS Code** — Recommended code editor

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/mindease.git
cd mindease
```

### 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## ⚙️ Configuration

### 🔐 Environment Variables

#### **Frontend Configuration**

Create a `.env` file in the `frontend/` directory:

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
# API Configuration
PUBLIC_API_URL=http://localhost:5000

# For production deployment:
# PUBLIC_API_URL=https://your-domain.com/api
```

#### **Backend Configuration**

Create a `.env` file in the `backend/` directory:

```bash
cd ../backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/mindease"

# Server Configuration
PORT=5000

# Example for cloud MySQL (PlanetScale, Railway, etc.):
# DATABASE_URL="mysql://user:pass@host.railway.app:3306/railway"
```

> **⚠️ Important**: Replace `username`, `password`, `localhost`, and `mindease` with your actual MySQL credentials.

---

## 🗄️ Database Setup

### 1️⃣ Create MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE mindease;
EXIT;
```

### 2️⃣ Run Prisma Migrations

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 3️⃣ Seed Database (Optional)

To populate your database with sample data, create a seed script:

```bash
# Create seed file
touch prisma/seed.js
```

Add sample psychologists and data to `prisma/seed.js`, then run:

```bash
node prisma/seed.js
```

---

## 🏃 Running the Application

### **Development Mode**

You'll need **two terminal windows** — one for frontend, one for backend.

#### Terminal 1: Start Backend Server

```bash
cd backend
node api/index.js
```

You should see:
```
✓ Backend running on http://localhost:5000
```

#### Terminal 2: Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

You should see:
```
🚀 astro v5.16.0 started in XXms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

### 🌐 Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:4321
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/

---

## 🚢 Deployment

MindEase is configured for **Vercel** deployment with serverless functions.

### **Prerequisites**
- Vercel account ([Sign up free](https://vercel.com))
- MySQL database (PlanetScale, Railway, or any cloud MySQL)

### **Step-by-Step Deployment**

#### 1️⃣ Install Vercel CLI

```bash
npm install -g vercel
```

#### 2️⃣ Login to Vercel

```bash
vercel login
```

#### 3️⃣ Configure Environment Variables

In your Vercel project dashboard:

**Frontend Environment Variables:**
```
PUBLIC_API_URL=https://your-domain.vercel.app/api
```

**Backend Environment Variables:**
```
DATABASE_URL=mysql://user:pass@host:3306/database
PORT=5000
```

#### 4️⃣ Deploy

```bash
# From project root
vercel

# For production
vercel --prod
```

### **Vercel Configuration**

The `vercel.json` file is already configured:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/frontend/$1"
    }
  ]
}
```

This routes:
- `/api/*` → Backend serverless functions
- `/*` → Frontend static pages

---

## 📡 API Documentation

### **Base URL**
- **Local**: `http://localhost:5000`
- **Production**: `https://your-domain.vercel.app/api`

### **Endpoints**

#### 🏥 Health Check
```http
GET /
```
**Response:**
```
MindEase API is running 🌿
```

---

#### 👨‍⚕️ Get All Psychologists
```http
GET /api/psychologists
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Dr. Sarah Johnson",
    "email": "sarah@mindease.com",
    "specialization": "Anxiety & Depression",
    "experience": "10 years",
    "rating": 4.8,
    "image": "/images/psychologist1.jpg",
    "isVerified": true
  }
]
```

---

#### 📅 Book a Session
```http
POST /api/sessions
```

**Request Body:**
```json
{
  "psychologistId": 1,
  "date": "2026-01-20",
  "time": "14:00",
  "type": "Video"
}
```

**Response:**
```json
{
  "message": "Session booked successfully",
  "id": 123
}
```

---

#### 📊 Log Mood
```http
POST /api/moods
```

**Request Body:**
```json
{
  "mood": "Happy",
  "note": "Had a great therapy session today!"
}
```

**Response:**
```json
{
  "message": "Mood logged successfully"
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with descriptive messages**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Code Style Guidelines**

- Use **TypeScript** for type safety
- Follow **Airbnb JavaScript Style Guide**
- Write **meaningful commit messages**
- Add **comments** for complex logic
- Test your changes locally before submitting

### **Reporting Bugs**

Open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 🐛 Troubleshooting

### **Common Issues**

#### ❌ Database Connection Failed

**Error:**
```
PrismaClientInitializationError: Can't reach database server
```

**Solution:**
1. Verify MySQL is running:
   ```bash
   mysql -u root -p
   ```
2. Check `DATABASE_URL` in `backend/.env`
3. Ensure database `mindease` exists
4. Test connection:
   ```bash
   cd backend
   npx prisma db push
   ```

---

#### ❌ Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

---

#### ❌ Frontend Can't Connect to Backend

**Error:**
```
Failed to fetch psychologists
```

**Solution:**
1. Ensure backend is running on `http://localhost:5000`
2. Check `PUBLIC_API_URL` in `frontend/.env`
3. Verify CORS is enabled in `backend/api/index.js`
4. Check browser console for detailed errors

---

#### ❌ Prisma Client Not Generated

**Error:**
```
Cannot find module '@prisma/client'
```

**Solution:**
```bash
cd backend
npx prisma generate
```

---

#### ❌ Build Fails on Vercel

**Common Causes:**
- Missing environment variables
- Database connection issues
- Incorrect `vercel.json` configuration

**Solution:**
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test build locally:
   ```bash
   cd frontend
   npm run build
   ```

---

## 📊 Database Schema

### **User**
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| email | String | Unique email |
| password | String | Hashed password |
| name | String? | User's name |
| ageGroup | String? | "Teen" or "Adult" |
| concern | String? | Primary mental health concern |
| createdAt | DateTime | Account creation date |
| updatedAt | DateTime | Last update |

### **Psychologist**
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| name | String | Full name |
| email | String | Unique email |
| specialization | String | Area of expertise |
| experience | String | Years of experience |
| rating | Float | Average rating (0-5) |
| image | String? | Profile image URL |
| isVerified | Boolean | Verification status |

### **Session**
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| userId | Int | Foreign key to User |
| psychologistId | Int | Foreign key to Psychologist |
| date | DateTime | Session date & time |
| type | String | "Chat", "Voice", or "Video" |
| status | String | "Scheduled", "Completed", "Cancelled" |

### **MoodLog**
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| userId | Int | Foreign key to User |
| mood | String | Mood descriptor |
| note | String? | Optional note |
| createdAt | DateTime | Log timestamp |

---

## 🔒 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use environment variables for sensitive data
- ✅ Implement authentication (JWT recommended)
- ✅ Sanitize user inputs
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Implement rate limiting on API endpoints

---

## 📈 Roadmap

### **Phase 1: MVP** ✅
- [x] Landing page
- [x] Psychologist directory
- [x] Session booking
- [x] Mood tracking
- [x] AI chatbot

### **Phase 2: Authentication** 🚧
- [ ] User registration & login
- [ ] JWT authentication
- [ ] Password reset flow
- [ ] Email verification

### **Phase 3: Enhanced Features** 📋
- [ ] Real-time chat with psychologists
- [ ] Video call integration (WebRTC)
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Appointment reminders (email/SMS)
- [ ] Admin dashboard for psychologists

### **Phase 4: Analytics & AI** 🤖
- [ ] Mood trend visualization
- [ ] AI-powered psychologist matching
- [ ] Sentiment analysis on chat logs
- [ ] Personalized resource recommendations

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Need help? Reach out:

- 📧 **Email**: support@mindease.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/mindease/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/mindease/discussions)

---

## 🙏 Acknowledgments

- **Astro Team** — For the amazing static site generator
- **Prisma Team** — For the best-in-class ORM
- **Mental Health Advocates** — For inspiring this project
- **Open Source Community** — For the incredible tools and libraries

---

## 🌈 Mental Health Resources

If you or someone you know is in crisis:

- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: [https://www.iasp.info/resources/Crisis_Centres/](https://www.iasp.info/resources/Crisis_Centres/)

---

<div align="center">

**Made with 💚 for Mental Wellness**

[⬆ Back to Top](#-mindease)

</div>
