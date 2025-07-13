import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const PORT = process.env.PORT || 4005;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// List Stripe products and prices
app.get('/products', async (req, res) => {
  try {
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true });
    // Map prices to products
    const productList = products.data.map(product => {
      const productPrices = prices.data.filter(price => price.product === product.id);
      return { ...product, prices: productPrices };
    });
    res.json(productList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create Stripe checkout session
app.post('/checkout', async (req, res) => {
  try {
    const { line_items, customer_email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: process.env.CHECKOUT_SUCCESS_URL || 'http://localhost:3000/success',
      cancel_url: process.env.CHECKOUT_CANCEL_URL || 'http://localhost:3000/cancel',
      customer_email,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook endpoint
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }
  // Handle event types
  switch (event.type) {
    case 'checkout.session.completed':
      // TODO: handle order fulfillment, inventory update, etc.
      break;
    // Add more event types as needed
    default:
      break;
  }
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Stripe service running on port ${PORT}`);
}); 