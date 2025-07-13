import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/products';

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB (products)');
    app.listen(PORT, () => {
      console.log(`Products service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 