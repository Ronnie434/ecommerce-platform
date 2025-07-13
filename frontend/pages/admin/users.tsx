import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminUsers: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>You must be logged in to access this page.</div>;
  if (user.role !== 'admin') return <div>Access denied. Admins only.</div>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      {/* TODO: Users table goes here */}
      <div className="bg-white p-4 rounded shadow">Users table placeholder</div>
    </div>
  );
};

export default AdminUsers; 