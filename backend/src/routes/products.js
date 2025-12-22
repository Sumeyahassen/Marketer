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

// Agent: Add product (stable, no image)
router.post('/', authenticate, requireRole(['AGENT']), async (req, res) => {
  const { name, description, price, stock } = req.body;

  // Validate required fields
  if (!name || !price || !stock) {
    return res.status(400).json({ error: 'Name, price, and stock are required' });
  }

  // Convert and validate numbers
  const priceNum = parseFloat(price);
  const stockNum = parseInt(stock, 10);

  if (isNaN(priceNum) || isNaN(stockNum)) {
    return res.status(400).json({ error: 'Price and stock must be valid numbers' });
  }

  if (priceNum <= 0 || stockNum < 0) {
    return res.status(400).json({ error: 'Price must be positive, stock cannot be negative' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description ? description.trim() : null,
        price: priceNum,
        stock: stockNum,
        agentId: req.user.id,
      },
    });

    console.log('Product created successfully:', product.id);
    res.status(201).json(product);
  } catch (err) {
    console.error('Database error when creating product:', err);
    res.status(500).json({
      error: 'Failed to save product',
      details: err.message
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