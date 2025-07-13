import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/orders';

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB (orders)');
    app.listen(PORT, () => {
      console.log(`Orders service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 