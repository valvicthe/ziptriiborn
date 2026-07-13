import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import operational routers (using .js extension as required by your NodeNext compiler target)
import userRouter from './routes/users.js';
import assetRouter from './routes/assets.js';
import avatarRouter from './routes/avatar.js';

const app = express();

// Capture the dynamic routing port injected by the Railway container infrastructure
const PORT = process.env.PORT || 3000;

// Production CORS configuration ensuring isolated frontend/backend communication
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true // Crucial for passing .ZIPTRIISECURITY session cookies securely
}));

// Core Request Parsers
app.use(express.json());
app.use(cookieParser());

/**
 * Global Service Health Check
 * Essential for Railway's deployment watchdogs to verify container availability
 */
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: "online", 
    engine: "Ziptrii Core", 
    timestamp: new Date().toISOString() 
  });
});

/**
 * Roblox API Routing Matrix
 * Binds active routes to match your Next.js application data requests
 */
app.use('/users', userRouter);    // Handles: /users/v1/users/:id
app.use('/friends', userRouter);  // Handles: /friends/v1/users/:id/friends
app.use('/', assetRouter);        // Handles: /catalog/v1/search & /games/v2/discover
app.use('/avatar', avatarRouter);  // Handles: /avatar/v1/users/:id & /avatar/v1/equip

/**
 * Initialize Web Server
 * Hardcoded to listen on '0.0.0.0' to allow global ingress proxy binding
 */
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`[Ziptrii] Live!`);
  console.log(`Network Ingress: http://0.0.0.0:${PORT}`);
});
