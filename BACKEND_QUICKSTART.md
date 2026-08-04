# 🎯 Backend Setup - Quick Start Guide

Everything is ready to go! Here's what I've set up for you:

## ✅ What's Created

### Backend Structure
```
server/
├── config/database.js          # MongoDB connection
├── models/Contact.js           # Contact data schema
├── routes/contact.js           # API endpoints
├── server.js                   # Express server
├── package.json                # Dependencies
├── .env.example                # Environment template
└── README.md                   # Backend documentation
```

### Frontend Integration
- ✅ Updated Contact component with form
- ✅ Added form styling in Contact.css
- ✅ Environment variables configured

## 🚀 Getting Started (3 Steps)

### Step 1: Install & Run Backend Locally
```bash
cd server
npm install
npm run dev
```
✅ Server running on http://localhost:5000

### Step 2: Test the Form
1. Go to http://localhost:5173 (your portfolio)
2. Scroll to Contact section
3. Fill the form and click "Send Message"
4. You should see a success message!

### Step 3: Deploy to Production

**MongoDB Atlas Setup (5 min)** - See DEPLOYMENT.md for details
- Create free MongoDB account
- Create a cluster
- Get connection string

**Railway Deployment (10 min)**
- Connect your GitHub repo
- Add environment variables
- Get your backend URL

## 📋 Environment Variables Needed

### Local Development (`.env` in server/)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Production (Railway Variables)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## 🔗 API Endpoints

All endpoints start with: `/api/contact`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/submit` | POST | Submit contact form |
| `/submissions` | GET | Get all submissions |
| `/submission/:id` | GET | Get single submission |
| `/submission/:id/status` | PATCH | Update status |
| `/submission/:id` | DELETE | Delete submission |
| `/stats` | GET | Get statistics |

## 📞 Contact Form Data Model

The form saves:
- ✅ Name
- ✅ Email (validated)
- ✅ Subject
- ✅ Message
- ✅ Sender IP
- ✅ Browser info
- ✅ Timestamp
- ✅ Status (new/read/replied)

## 🔒 Built-in Safety Features

- ✅ Rate limiting (1 message per minute per email)
- ✅ Input validation
- ✅ CORS protection
- ✅ Error handling
- ✅ Request logging

## 📚 Full Documentation

For detailed setup and deployment instructions:
**👉 See [DEPLOYMENT.md](../DEPLOYMENT.md)**

It includes:
- MongoDB Atlas setup (free)
- Railway deployment (free tier)
- API documentation
- Troubleshooting guide
- Testing instructions

## 🎉 You're All Set!

The backend is production-ready with:
- ✅ Full REST API
- ✅ Database integration
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS support
- ✅ Easy deployment

### Next: Deploy!

1. **MongoDB**: Create free account on [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Railway**: Sign up on [railway.app](https://railway.app/)
3. **Deploy**: Push to GitHub, Railway auto-deploys
4. **Connect**: Update `CORS_ORIGIN` in Railway env variables

That's it! Your portfolio now has a working contact system! 🚀

---

**Questions?** Check the DEPLOYMENT.md file or check the code comments in the files.
