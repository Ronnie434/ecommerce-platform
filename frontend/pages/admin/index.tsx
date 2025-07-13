import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';

const adminSections = [
  {
    href: '/admin/products',
    title: 'Manage Products',
    desc: 'Add, edit, or remove products from your store.',
    color: 'bg-blue-50',
  },
  {
    href: '/admin/orders',
    title: 'View Orders',
    desc: 'Track and manage customer orders and fulfillment.',
    color: 'bg-green-50',
  },
  {
    href: '/admin/users',
    title: 'Manage Users',
    desc: 'View and manage user accounts and roles.',
    color: 'bg-yellow-50',
  },
];

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">You must be logged in to access the admin dashboard.</div>;
  if (user.role !== 'admin') return <div className="min-h-screen flex items-center justify-center text-lg">Access denied. Admins only.</div>;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {adminSections.map(section => (
          <a key={section.href} href={section.href} className={`rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-2xl ${section.color}`}>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{section.title}</h2>
            <p className="text-gray-700 mb-2">{section.desc}</p>
            <span className="inline-block mt-2 text-blue-700 font-semibold">Go &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard; 