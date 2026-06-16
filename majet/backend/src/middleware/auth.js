const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized – no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, status: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'Not authorized – user not found' });
    }

    // Block if not approved (except Super Admin)
    if (user.role !== 'SUPER_ADMIN' && user.status !== 'approved') {
      return res.status(403).json({ error: 'Account not approved yet' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized – invalid token' });
  }
};

// Role-based protection
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };