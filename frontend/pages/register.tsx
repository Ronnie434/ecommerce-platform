import React, { useState } from 'react';
import axios from '../lib/axios';
import Button from '../components/Button';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('/register', { email, password, role });
      setSuccess(true);
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Register</h1>
        {success && <div className="text-green-600 mb-2">Registration successful! You can now log in.</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <label className="font-medium text-gray-700">Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </label>
        <label className="font-medium text-gray-700">Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </label>
        <label className="font-medium text-gray-700">Role
          <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <Button type="submit" variant="primary" className="w-full mt-4 text-lg py-2" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage; 