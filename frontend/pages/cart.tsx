import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Card from '../components/Card';
import axios from '../lib/axios';
import { useRouter } from 'next/router';

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currency = items[0]?.currency?.toUpperCase() || 'USD';

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const line_items = items.map(item => ({
        price: item.priceId,
        quantity: item.quantity,
      }));
      const res = await axios.post('/checkout', {
        line_items,
      });
      if ((res.data as any).url) {
        clearCart();
        window.location.href = (res.data as any).url;
      } else {
        setError('Failed to create checkout session.');
      }
    } catch (err: any) {
      setError('Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="w-full max-w-2xl space-y-4 mb-8">
          {items.map(item => (
            <Card key={item.productId + item.priceId} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-gray-600 text-sm mb-2">
                  {item.price / 100} {item.currency.toUpperCase()} x
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.productId, item.priceId, Math.max(1, Number(e.target.value)))}
                    className="w-16 ml-2 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <Button
                variant="danger"
                className="mt-2 md:mt-0 md:ml-4"
                onClick={() => removeFromCart(item.productId, item.priceId)}
              >
                Remove
              </Button>
            </Card>
          ))}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <div className="text-lg font-bold text-gray-900">Total:</div>
            <div className="text-lg font-bold text-gray-900">{(total / 100).toLocaleString(undefined, { style: 'currency', currency })}</div>
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <Button
            variant="primary"
            className="w-full mt-4 text-lg py-3"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Redirecting to Checkout...' : 'Checkout'}
          </Button>
        </div>
      )}
    </main>
  );
};

export default CartPage; 