const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');
const { authenticate, requireRole } = require('../middleware/auth');

// Get all users (Admin only)
router.get('/users', authenticate, requireRole(['ADMIN']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', authenticate, requireRole(['ADMIN']), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Cannot delete user' });
  }
});

module.exports = router;