const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');
const upload = require('../middleware/upload');
const { authenticate, requireRole } = require('../middleware/auth');
const cloudinary = require('cloudinary').v2; // Make sure this is imported

// Get all products (anyone can view)
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { agent: { select: { email: true } } },
    });
    res.json(products);
  } catch (err) {
    console.error('GET products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', authenticate, requireRole(['AGENT']), upload, async (req, res) => {
  const { name, description, price, stock } = req.body;
  let imageUrl = null;

  if (req.file) {
    try {
      // Convert buffer to base64 data URI (RELIABLE method)
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'marketer_products', // optional
        resource_type: 'image',
      });

      imageUrl = result.secure_url;
      console.log('Image uploaded successfully:', imageUrl); // for logs
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return res.status(500).json({ error: 'Image upload failed - check file size or format' });
    }
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
        agentId: req.user.id,
      },
    });

    res.json(product);
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});
// Agent: Update product (only own) - basic version (no image update yet)
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
    console.error('Update error:', err);
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
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;