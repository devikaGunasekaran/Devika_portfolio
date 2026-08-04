# 🚀 Devika's Portfolio - Backend Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Railway Deployment](#railway-deployment)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## 🏠 Local Development Setup

### Prerequisites
- Node.js 18.x or higher installed
- npm or yarn package manager
- MongoDB Atlas account (free tier available)
- Git (for version control)

### Step 1: Install Dependencies

```bash
# Navigate to server directory
cd server

# Install packages
npm install
```

### Step 2: Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your local settings
# For development:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devika-portfolio
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Start Local Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   🚀 Server Running Successfully!      ║
║   📍 Port: 5000                        ║
║   🌍 URL: http://localhost:5000        ║
║   💾 Database: MongoDB Connected       ║
╚════════════════════════════════════════╝
```

---

## 🗂️ MongoDB Atlas Setup (FREE)

### Step 1: Create MongoDB Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Create an account (use Google for quick signup)

### Step 2: Create a Cluster
1. Click "Build a Cluster"
2. Select "Free" tier (M0 - 512 MB storage)
3. Choose any region (e.g., aws/US-East-1)
4. Wait for cluster to be created (~5 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username: `devika_portfolio`
5. Set secure password (copy it!)
6. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: add your Railway IP when deploying
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Skip "Choose a language/driver"
4. Copy connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `devika-portfolio`

**Example:**
```
mongodb+srv://devika_portfolio:PASSWORD@cluster.mongodb.net/devika-portfolio
```

---

## 🚂 Railway Deployment

Railway makes deploying Node.js apps super easy!

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app/)
2.  Click "Start Project"
3. Sign up with GitHub (recommended)
4. Authorize Railway

### Step 2: Deploy Backend from GitHub

**Option A: Connect GitHub Repository**
1. Click "New Project"
2. Select "Deploy from GitHub"
3. Select your portfolio repository
4. Select the `server` directory as root
5. Click "Deploy"

**Option B: Deploy from CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link project
railway link

# Deploy
railway up
```

### Step 3: Configure Environment Variables

1. Go to your Railway project dashboard
2. Click "Variables" tab
3. Add these variables:

```
MONGODB_URI=mongodb+srv://devika_portfolio:PASSWORD@cluster.mongodb.net/devika-portfolio
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

4. Click "Save"

### Step 4: Get Your Backend URL

1. Go to "Deployments" tab
2. Copy the **deployment URL** (looks like: `https://your-app-production.up.railway.app`)
3. Your API will be available at: `https://your-app-production.up.railway.app/api/contact/submit`

---

## 🎨 Frontend Configuration

### Step 1: Update Frontend Environment

In `react-portfolio/.env.production`:
```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

Replace `your-railway-backend-url` with your actual Railway URL.

### Step 2: Deploy Frontend

**Option A: Vercel (Easiest)**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd react-portfolio

# Deploy
vercel
```

**Option B: GitHub Pages**
```bash
# Build the project
npm run build

# Deploy using gh-pages
npm run deploy
```

### Step 3: Update CORS in Backend

Once frontend is deployed, update Railway environment variable:
```
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

---

## 🧪 Testing

### Test API Endpoints Locally

```bash
# Health check
curl http://localhost:5000/api/health

# Submit contact form (test offline)
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'

# Get all submissions
curl http://localhost:5000/api/contact/submissions

# Get statistics
curl http://localhost:5000/api/contact/stats
```

### Test in Browser

1. Go to your portfolio: `http://localhost:5173`
2. In Contact section, fill the form
3. Click "Send Message"
4. Should see success message
5. Check MongoDB Atlas to verify data was saved

---

## 🐛 Troubleshooting

### ❌ "Cannot reach database"
- Check MongoDB URI in `.env`
- Verify database user password is correct
- Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0 for Railway)

### ❌ "CORS error when submitting form"
- Verify `CORS_ORIGIN` in backend `.env` matches your frontend URL
- For development: should be `http://localhost:5173`
- For production: should be your actual frontend domain

### ❌ "Form submission fails with 429"
- This is intentional! Prevents spam
- Wait 1 minute before submitting again
- You can modify the cooldown time in `routes/contact.js`

### ❌ "Backend URL not found in frontend"
- Check `.env.production` has correct `VITE_API_URL`
- Make sure to rebuild after changing .env: `npm run build`
- Clear browser cache (Ctrl+Shift+Delete)

### ❌ "Port 5000 already in use"
```bash
# Windows: Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

---

## 📊 API Documentation

### Base URL
- Local: `http://localhost:5000`
- Production: `https://your-railway-url.up.railway.app`

### Endpoints

#### 1. Submit Contact Form
```
POST /api/contact/submit
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here"
}

Response (201):
{
  "success": true,
  "message": "Thanks for reaching out! I will get back to you soon.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "timestamp": "2024-02-24T10:30:00.000Z"
  }
}
```

#### 2. Get All Submissions (Admin)
```
GET /api/contact/submissions

Response (200):
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

#### 3. Get Single Submission
```
GET /api/contact/submission/:id

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### 4. Update Submission Status (Admin)
```
PATCH /api/contact/submission/:id/status
Content-Type: application/json

Body:
{
  "status": "replied"
}

Allowed statuses: "new", "read", "replied"
```

#### 5. Delete Submission
```
DELETE /api/contact/submission/:id

Response (200):
{
  "success": true,
  "message": "Submission deleted successfully"
}
```

#### 6. Get Statistics
```
GET /api/contact/stats

Response (200):
{
  "success": true,
  "data": {
    "total": 10,
    "new": 3,
    "read": 5,
    "replied": 2
  }
}
```

#### 7. Health Check
```
GET /api/health

Response (200):
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-02-24T10:30:00.000Z"
}
```

---

## 🔐 Security Notes

1. **Environment Variables:** Never commit `.env` to GitHub
2. **API Keys:** Keep MongoDB credentials secure
3. **CORS:** Only allow your frontend URL in production
4. **Rate Limiting:** Already built-in (1 message per minute per email)
5. **Validation:** All inputs are validated server-side

---

## 📞 Support

If you face any issues:
1. Check logs: Railway dashboard > Deployments > Logs
2. Test locally first before deploying
3. Verify all environment variables are set correctly
4. Check MongoDB Atlas has whitelist IP added

---

## ✅ Next Steps

1. ✅ Set up MongoDB Atlas (free)
2. ✅ Deploy to Railway (free tier)
3. ✅ Configure environment variables
4. ✅ Test form submission
5. ✅ Monitor submissions in MongoDB Atlas
6. ✅ Add email notifications (optional)

Happy coding! 🎉
