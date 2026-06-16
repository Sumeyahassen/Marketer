const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const { protect, restrictTo } = require('./middleware/auth');
dotenv.config();

const app = express();
const prisma = new PrismaClient();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Majet Backend is Running Successfully! 🚀' });
});

// Test database
app.get('/test-db', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ message: 'Database connected successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Majet Backend server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});