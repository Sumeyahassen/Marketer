const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug log to check if Cloudinary is configured (visible in Render logs)
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log('Cloudinary configured successfully');
} else {
  console.warn('Cloudinary credentials missing!');
}

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all for development (change to your frontend URL in production)
  credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // Increase limit for image uploads

// Import routes
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const transactionRoutes = require('./src/routes/transactions');
// const adminRoutes = require('./src/routes/admin');

// Mount routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);
// app.use('/admin', adminRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Marketer Backend is running! 🚀');
});

// Global error handler - PREVENTS 500 crashes from being silent
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit https://marketer-up1r.onrender.com for live backend`);
});