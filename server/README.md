# 🚀 Devika's Portfolio - Backend Server

Express.js backend for handling contact form submissions with MongoDB integration.

## 🎯 Features

- ✅ Express.js REST API
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation and sanitization
- ✅ Rate limiting (1 submission per minute per email)
- ✅ Request logging
- ✅ Error handling with detailed messages
- ✅ Production-ready configuration

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

Server runs on `http://localhost:5000`

### Production
```bash
npm install
npm start
```

## 📝 Environment Setup

Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Required variables:
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Frontend URL for CORS

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact/submit` | Submit contact form |
| GET | `/api/contact/submissions` | Get all submissions |
| GET | `/api/contact/submission/:id` | Get single submission |
| PATCH | `/api/contact/submission/:id/status` | Update submission status |
| DELETE | `/api/contact/submission/:id` | Delete submission |
| GET | `/api/contact/stats` | Get statistics |
| GET | `/api/health` | Health check |

## 🗄️ Database Schema

### Contact Model
```javascript
{
  name: String (required),
  email: String (required, validated),
  subject: String (required),
  message: String (required),
  ip: String,
  userAgent: String,
  status: String ('new', 'read', 'replied'),
  createdAt: Date (indexed),
  updatedAt: Date
}
```

## 🌐 Deployment

### Railway (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

For detailed instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md)

## 📦 Dependencies

- **express** ^4.18.2 - Web framework
- **mongoose** ^7.4.1 - MongoDB ODM
- **cors** ^2.8.5 - Cross-origin resource sharing
- **dotenv** ^16.3.1 - Environment variables
- **nodemailer** ^6.9.5 - Email notifications (optional)

## 📖 Project Structure

```
server/
├── config/
│   └── database.js
├── models/
│   └── Contact.js
├── routes/
│   └── contact.js
├── server.js
├── package.json
├── .env.example
└── .gitignore
```

## 🔐 Security Features

- Input validation and sanitization
- Rate limiting to prevent spam
- CORS policy enforcement
- Secure password storage (MongoDB)
- Request logging for monitoring
- Error handling without exposing sensitive info

## 🐛 Troubleshooting

See [DEPLOYMENT.md - Troubleshooting](../DEPLOYMENT.md#-troubleshooting)

## 📞 Support

For issues or questions, check:
1. Logs in railway dashboard
2. MongoDB Atlas connection status
3. Environment variables configuration
4. CORS origin settings

---

**Happy coding!** 🎉
