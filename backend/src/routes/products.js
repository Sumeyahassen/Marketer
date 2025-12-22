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

// Agent: Add product with image
// Agent: Add product with image
router.post('/', authenticate, requireRole(['AGENT']), upload, async (req, res) => {
  const { name, description, price, stock } = req.body;
  let imageUrl = null;

  if (req.file) {
    try {
      // FIXED: Proper Promise to wait for upload
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'marketer_products', // optional folder in Cloudinary
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              console.log('Image uploaded:', result.secure_url);
              resolve(result.secure_url);
            }
          }
        );

        // Send buffer to stream
        uploadStream.end(req.file.buffer);
      });
    } catch (err) {
      console.error('Image upload failed:', err);
      return res.status(500).json({ error: 'Failed to upload image' });
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
    console.error('Product creation failed:', err);
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