import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import axios from '../lib/axios';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

interface Price {
  id: string;
  unit_amount: number;
  currency: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  prices: Price[];
  images?: string[];
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/products');
        setProducts(res.data);
        console.log('Fetched products:', res.data);
      } catch (err: any) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!product.prices.length) return;
    const price = product.prices[0];
    addToCart({
      productId: product.id,
      name: product.name,
      priceId: price.id,
      price: price.unit_amount,
      currency: price.currency,
      quantity: 1,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  const currencyFormat = (amount: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amount / 100);

  return (
    <main className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Products</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse h-64 flex flex-col justify-between">
              <div className="bg-gray-200 h-32 w-full rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-10 bg-gray-200 rounded w-full" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {products.map(product => (
            <Card key={product.id} className="flex flex-col h-full justify-between">
              <div>
                <div className="w-full h-40 mb-4 flex items-center justify-center bg-gray-100 rounded">
                  {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.name} width={160} height={160} className="object-contain max-h-36" />
                  ) : (
                    <Image src="/placeholder.svg" alt="No image" width={80} height={80} className="opacity-40" />
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
                <p className="mb-2 text-gray-600 text-sm">{product.description || 'No description.'}</p>
                {product.prices.length > 0 && (
                  <div className="mb-4">
                    <span className="font-bold text-gray-800 text-lg">
                      {currencyFormat(product.prices[0].unit_amount, product.prices[0].currency)}
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="primary"
                className="w-full mt-auto"
                onClick={() => handleAddToCart(product)}
                disabled={added === product.id}
              >
                {added === product.id ? 'Added!' : 'Add to Cart'}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductsPage; 