const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all pending users (Marketers & Agents only)
router.get('/pending-users', protect, restrictTo('SUPER_ADMIN'), async (req, res) => {
  try {
    const pendingUsers = await prisma.user.findMany({
      where: {
        status: 'pending',
        role: {
          in: ['MARKETER', 'AGENT'],
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      message: 'Pending users fetched successfully',
      count: pendingUsers.length,
      users: pendingUsers,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending users', details: error.message });
  }
});

// Approve a user
router.patch('/approve/:id', protect, restrictTo('SUPER_ADMIN'), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { status: 'approved' },
      select: { id: true, email: true, name: true, role: true, status: true },
    });

    res.json({
      message: 'User approved successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve user', details: error.message });
  }
});

// Reject a user
router.patch('/reject/:id', protect, restrictTo('SUPER_ADMIN'), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { status: 'suspended' }, // or you can delete, but suspended is safer
    });

    res.json({
      message: 'User rejected and suspended',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject user', details: error.message });
  }
});

module.exports = router;