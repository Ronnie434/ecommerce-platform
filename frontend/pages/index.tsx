import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center text-gray-900 tracking-tight drop-shadow-lg">Welcome to <span className="text-blue-700">Shopster</span>!</h1>
        <p className="mb-8 text-xl text-center max-w-2xl text-gray-700">Discover amazing products, enjoy seamless checkout, and manage your orders with ease. Built with Next.js, Node.js microservices, MongoDB, and Stripe.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/products" className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition">Shop Now</a>
          <a href="/admin" className="inline-block px-8 py-3 bg-gray-200 text-gray-900 text-lg font-semibold rounded-lg shadow hover:bg-gray-300 transition">Admin Dashboard</a>
        </div>
      </section>
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop Products</h2>
          <p className="mb-6 text-gray-600">Browse our catalog and find your next favorite item.</p>
          <div className="flex justify-center">
            <a href="/products" className="w-full">
              <Button variant="primary" className="w-full">View Products</Button>
            </a>
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="mb-6 text-gray-600">Manage products, orders, and users (admin only).</p>
          <div className="flex justify-center">
            <a href="/admin" className="w-full">
              <Button variant="secondary" className="w-full">Go to Admin</Button>
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
