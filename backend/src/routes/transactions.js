const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');
const { authenticate, requireRole } = require('../middleware/auth');

// Buy product (Marketer or Client)
router.post('/buy', authenticate, requireRole(['MARKETER', 'CLIENT']), async (req, res) => {
  const { productId, quantity, sellerId } = req.body;

  if (!productId || !quantity || !sellerId) {
    return res.status(400).json({ error: 'productId, quantity, and sellerId are required' });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Not enough stock' });

    await prisma.$transaction(async (tx) => {
      // Reduce stock
      await tx.product.update({
        where: { id: parseInt(productId) },
        data: { stock: { decrement: quantity } },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          buyerId: req.user.id,
          sellerId: parseInt(sellerId),
          productId: parseInt(productId),
          quantity: parseInt(quantity),
          status: 'COMPLETED',
        },
      });
    });

    res.json({ success: true, message: 'Purchase completed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Purchase failed' });
  }
});

module.exports = router;