import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventory';

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB (inventory)');
    app.listen(PORT, () => {
      console.log(`Inventory service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// In-memory inventory store (replace with MongoDB in production)
const inventory: Record<string, number> = {
  // productId: quantity
  'prod_1': 10,
  'prod_2': 5,
};

// Sync inventory (update stock levels)
app.post('/sync', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  inventory[productId] = quantity;
  res.json({ productId, quantity });
});

// Validate stock before checkout
app.post('/validate', (req, res) => {
  const { productId, requested } = req.body;
  if (!productId || typeof requested !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const available = inventory[productId] || 0;
  if (available >= requested) {
    res.json({ valid: true, available });
  } else {
    res.json({ valid: false, available });
  }
}); 