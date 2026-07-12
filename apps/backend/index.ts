import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users.js';
import assetRoutes from './routes/assets.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Wire Core API Routes
app.use('/users', userRoutes);
app.use('/', assetRoutes); // Handles the direct root level /asset queries

app.listen(PORT, () => {
  console.log(`[Ziptrii Web Backend] Online on port ${PORT}`);
});
