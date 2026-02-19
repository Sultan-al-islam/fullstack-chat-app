# STalk - Real-Time Chat Application

A modern, full-stack chat application featuring real-time messaging, user authentication, and file sharing capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [WebSocket Events](#websocket-events)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

NupTalk is a comprehensive chat platform that enables users to communicate in real-time with support for multimedia content, user profiles, and message history.

## ✨ Features

- **User Authentication** - Secure login/signup with JWT tokens
- **Real-Time Messaging** - Instant message delivery via WebSocket
- **File Uploads** - Share images and files using Cloudinary
- **User Profiles** - Customizable user information and avatars
- **Message History** - Persistent chat history with database
- **Responsive UI** - Mobile-friendly interface with Tailwind CSS
- **Typing Indicators** - See when users are typing
- **Online Status** - Real-time user presence tracking
- **Search Functionality** - Find messages and contacts

## 📁 Project Structure

```
ChatApp/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Business logic handlers
│   │   ├── middleware/         # Authentication, error handling
│   │   ├── models/             # Database schemas
│   │   ├── routes/             # API endpoints
│   │   ├── lib/
│   │   │   ├── db.js           # Database connection
│   │   │   ├── socket.js       # WebSocket configuration
│   │   │   └── cloudinary.js   # File upload setup
│   │   └── index.js            # Server entry point
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page-level components
│   │   ├── store/              # State management
│   │   ├── lib/
│   │   │   ├── api.js          # API client
│   │   │   └── utils.js        # Helper functions
│   │   ├── constants/          # App constants
│   │   ├── assets/             # Images, icons
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Static files
│   ├── index.html              # HTML template (Vite)
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── postcss.config.js       # PostCSS config
│   └── package.json
│
└── README.md                   # This file
```

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **Socket.io** | Real-time bidirectional communication |
| **JWT** | User authentication tokens |
| **Cloudinary** | Cloud file storage |
| **dotenv** | Environment configuration |
| **bcryptjs** | Password hashing |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first CSS |
| **Axios** | HTTP client |
| **Socket.io Client** | WebSocket client |
| **React Router** | Client-side routing |
| **Zustand/Redux** | State management |

## 📦 Installation

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# (See Configuration section below)

# Initialize database
npm run seed
```

### Frontend Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
cp .env.example .env
```

## ⚙️ Configuration

### Backend .env

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nuptalk
DATABASE_NAME=nuptalk

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CORS_ORIGIN=http://localhost:5173

# Socket.io
SOCKET_CORS_ORIGIN=http://localhost:5173
```

### Frontend .env

```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Running the Application

### Backend

```bash
cd backend

# Development mode (with hot reload)
npm run dev

# Production mode
npm start

# Server runs on http://localhost:5000
```

### Frontend

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Development server runs on http://localhost:5173
```

### Running Both Concurrently

From the root directory:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/signup
  Body: { email, username, password }
  Returns: { token, user }

POST /api/auth/login
  Body: { email, password }
  Returns: { token, user }

POST /api/auth/logout
  Headers: { Authorization: Bearer <token> }
  Returns: { message: "Logged out successfully" }

GET /api/auth/me
  Headers: { Authorization: Bearer <token> }
  Returns: { user }
```

### Messages Endpoints

```
GET /api/messages
  Query: { conversationId, limit, skip }
  Returns: [{ _id, content, sender, timestamp }]

POST /api/messages
  Headers: { Authorization: Bearer <token> }
  Body: { content, conversationId, fileUrl }
  Returns: { _id, content, sender, timestamp }

DELETE /api/messages/:id
  Headers: { Authorization: Bearer <token> }
  Returns: { message: "Message deleted" }
```

### Conversations Endpoints

```
GET /api/conversations
  Headers: { Authorization: Bearer <token> }
  Returns: [{ _id, participants, lastMessage, updatedAt }]

POST /api/conversations
  Headers: { Authorization: Bearer <token> }
  Body: { participantIds: [id1, id2] }
  Returns: { _id, participants, createdAt }

DELETE /api/conversations/:id
  Headers: { Authorization: Bearer <token> }
  Returns: { message: "Conversation deleted" }
```

### Users Endpoints

```
GET /api/users
  Query: { search }
  Returns: [{ _id, username, email, avatar }]

GET /api/users/:id
  Returns: { _id, username, email, avatar, createdAt }

PUT /api/users/:id
  Headers: { Authorization: Bearer <token> }
  Body: { username, avatar, bio }
  Returns: { user }
```

## 🔌 WebSocket Events

### Client → Server

```javascript
// Connect
socket.emit('user:online', { userId })

// Send message
socket.emit('message:send', { 
  conversationId, 
  content, 
  fileUrl 
})

// Typing indicator
socket.emit('message:typing', { conversationId })

// Stop typing
socket.emit('message:stopTyping', { conversationId })

// Mark as read
socket.emit('message:read', { conversationId })
```

### Server → Client

```javascript
// Receive message
socket.on('message:received', (data) => {
  // { _id, content, sender, timestamp }
})

// User typing
socket.on('message:userTyping', (data) => {
  // { userId, conversationId }
})

// User online
socket.on('user:online', (data) => {
  // { userId, status: 'online' }
})

// Error
socket.on('error', (error) => {
  // { message }
})
```

## 💾 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  avatar: String (URL),
  bio: String,
  isOnline: Boolean,
  lastSeen: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  _id: ObjectId,
  conversationId: ObjectId (ref: Conversation),
  sender: ObjectId (ref: User),
  content: String,
  fileUrl: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Conversation Model
```javascript
{
  _id: ObjectId,
  participants: [ObjectId] (ref: User),
  lastMessage: ObjectId (ref: Message),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### Deploying Backend (Heroku/Railway)

```bash
# Create Procfile
echo "web: node src/index.js" > Procfile

# Deploy
git push heroku main
```

### Deploying Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy using Vercel CLI
vercel --prod

# Or connect GitHub repository to Netlify
```

### Environment Variables for Production

Update `.env` on hosting platforms with production values:
- `MONGODB_URI` (production database)
- `JWT_SECRET` (strong secret)
- `CLOUDINARY_*` credentials
- `CORS_ORIGIN` (production frontend URL)

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000
```

**MongoDB connection error:**
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure credentials are URL-encoded

**WebSocket connection fails:**
- Check CORS_ORIGIN in `.env`
- Verify Socket.io version matches client

### Frontend Issues

**Vite port conflict:**
```bash
npm run dev -- --port 3000
```

**API requests failing:**
- Verify `VITE_API_URL` matches backend URL
- Check browser console for CORS errors
- Ensure authentication token is sent in headers

**WebSocket not connecting:**
- Check network tab in DevTools
- Verify backend Socket.io is running
- Check `VITE_SOCKET_URL` configuration

## 📝 Git Workflow

```bash
# Clone repository
git clone <repository-url>

# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: describe your feature"

# Push to remote
git push origin feature/feature-name

# Create Pull Request
```

## 📄 License

This project is proprietary. Unauthorized use, modification, or distribution is prohibited.

## 👥 Contributors

- Development Team

## 📞 Support

For issues, questions, or contributions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error logs and screenshots if applicable

## 🔒 Security

- Never commit `.env` files
- Use strong JWT secrets
- Always use HTTPS in production
- Validate and sanitize user input
- Implement rate limiting for API endpoints

---

**Last Updated:** February 19, 2026
