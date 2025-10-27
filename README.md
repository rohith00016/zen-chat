# ZenChat 💬

A modern, real-time chat application built with the MERN stack, featuring real-time messaging, user authentication, and a beautiful responsive UI.

![ZenChat](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green) ![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-orange)

## 🚀 Project Overview

ZenChat is a full-stack real-time messaging application that enables users to communicate instantly through a modern, responsive interface. Built with performance and user experience in mind, it features real-time message delivery, user presence indicators, file sharing system, and clean Inter & Poppins typography.

### Core Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, DaisyUI, Zustand
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **File Storage**: Cloudinary
- **Styling**: Inter & Poppins fonts, modern UI components

## ✨ Features

- **💬 Real-time Messaging**: Instant message delivery with Socket.IO
- **👤 User Authentication**: Secure signup/login with JWT tokens
- **🟢 Online Presence**: See who's online in real-time
- **📁 File Sharing**: Upload and share images, audio, and video files
- **✏️ Message Management**: Edit and delete your own messages
- **👤 Profile Management**: Update profile picture, username, and display name
- **🔍 Smart Search**: Find conversations and users quickly
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean design with Inter & Poppins typography
- **⚡ Performance Optimized**: Lazy loading, code splitting, and React optimizations
- **🔒 Error Boundaries**: Graceful error handling and recovery
- **🌙 Dark Mode Ready**: Built with dark theme support
- **🔔 Notifications**: Sound notifications for new messages
- **💾 Message History**: Persistent message storage and retrieval

## 📁 Project Structure

```
zen-chat/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Authentication & validation
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── socket/             # Socket.IO configuration
│   ├── utils/              # Helper functions
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── zustand/        # State management
│   ├── public/             # Static assets
│   └── dist/               # Production build
└── package.json            # Root package configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/rohith00016/zen-chat.git
   cd zen-chat
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend && npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/zenchat
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Start the development servers**

   **Option 1: Run both servers separately**

   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

   **Option 2: Use the root build command**

   ```bash
   npm run build
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Environment Variables

### Backend (.env)

| Variable                | Description               | Example                             |
| ----------------------- | ------------------------- | ----------------------------------- |
| `MONGODB_URI`           | MongoDB connection string | `mongodb://localhost:27017/zenchat` |
| `JWT_SECRET`            | Secret key for JWT tokens | `your_super_secret_jwt_key_here`    |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     | `your_cloudinary_cloud_name`        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        | `your_cloudinary_api_key`           |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     | `your_cloudinary_api_secret`        |
| `PORT`                  | Server port               | `5000`                              |

### Frontend (.env)

| Variable          | Description          | Example                 |
| ----------------- | -------------------- | ----------------------- |
| `VITE_API_URL`    | Backend API URL      | `http://localhost:5000` |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:5000` |

## 🚀 Build for Production

### Development Build

```bash
# Build frontend for development
cd frontend && npm run build

# Start production server
npm start
```

### Production Deployment

```bash
# Install all dependencies
npm install
cd frontend && npm install

# Build optimized frontend
cd frontend && npm run build

# Start production server
npm start
```

The application will be available at the configured PORT (default: 5000).

## 🌐 Deployment

### Frontend (Netlify)

1. **Connect your repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`
3. **Set environment variables** in Netlify dashboard:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   VITE_SOCKET_URL=https://your-backend-url.vercel.app
   ```
4. **Deploy**: Netlify will automatically build and deploy your frontend

### Backend (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
2. **Login to Vercel**:
   ```bash
   vercel login
   ```
3. **Deploy from project root**:
   ```bash
   vercel
   ```
4. **Set environment variables** in Vercel dashboard:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5. **Redeploy** after setting environment variables:
   ```bash
   vercel --prod
   ```

### Deployment Files

- **`frontend/netlify.toml`**: Netlify configuration with build settings, redirects, and headers
- **`vercel.json`**: Vercel configuration for backend deployment
- **`backend/package.json`**: Backend package configuration for Vercel

## 🎯 Available Scripts

### Root Level

- `npm run server` - Start backend with nodemon
- `npm start` - Start production server
- `npm run build` - Build frontend and install dependencies

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run perf:test` - Performance testing

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [React](https://reactjs.org/) for the frontend framework
- [TailwindCSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for the database
- [Cloudinary](https://cloudinary.com/) for file storage

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/rohith00016/zen-chat/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Built with ❤️ by the ZenChat team**
