import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../lib/axios';
import Button from '../../components/Button';

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

const AdminProducts: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user && user.role === 'admin') {
      setLoading(true);
      setError(null);
      axios.get('/products')
        .then(res => setProducts(res.data as Product[]))
        .catch(() => setError('Failed to load products.'));
    }
  }, [authLoading, user]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-lg">You must be logged in to access this page.</div>;
  if (user.role !== 'admin') return <div className="min-h-screen flex items-center justify-center text-lg">Access denied. Admins only.</div>;

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-between items-center w-full max-w-5xl mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <Button variant="primary" className="px-6 py-2">+ Add Product</Button>
      </div>
      {loading ? (
        <div className="w-full max-w-5xl animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4" />
          <div className="h-12 bg-gray-200 rounded mb-4" />
          <div className="h-12 bg-gray-200 rounded mb-4" />
        </div>
      ) : error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-gray-500 text-lg mt-12">No products found.</div>
      ) : (
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="min-w-full bg-white rounded-xl shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b last:border-none hover:bg-blue-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                  <td className="py-3 px-4">
                    {product.prices.length > 0 ? (
                      <span>{(product.prices[0].unit_amount / 100).toLocaleString(undefined, { style: 'currency', currency: product.prices[0].currency })}</span>
                    ) : (
                      <span className="text-gray-400">No price</span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <Button variant="secondary" className="px-4 py-1">Edit</Button>
                    <Button variant="danger" className="px-4 py-1">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts; 