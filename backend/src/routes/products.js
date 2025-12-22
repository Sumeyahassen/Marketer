const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');
const upload = require('../middleware/upload');
const { authenticate, requireRole } = require('../middleware/auth');

// Get all products (anyone can view)
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { agent: { select: { email: true } } },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Agent: Add product (no image - stable)
router.post('/', authenticate, requireRole(['AGENT']), async (req, res) => {
  const { name, description, price, stock } = req.body;

  // Validate input
  if (!name || !price || !stock) {
    return res.status(400).json({ error: 'Name, price, and stock are required' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: String(name),
        description: description ? String(description) : null,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        agentId: req.user.id,
      },
    });

    console.log('Product created:', product); // for Render logs
    res.status(201).json(product);
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({
      error: 'Failed to create product',
      details: err.message // show error in logs/frontend
    });
  }
});
// Agent: Update product (only own)
router.put('/:id', authenticate, requireRole(['AGENT']), async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.agentId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    const updated = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Agent: Delete product (only own)
router.delete('/:id', authenticate, requireRole(['AGENT']), async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.agentId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;