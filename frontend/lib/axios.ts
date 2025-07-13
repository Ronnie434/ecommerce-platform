import axios from 'axios';

// For local development, point directly to the Stripe service
// For production, use NEXT_PUBLIC_API_BASE_URL (API gateway or reverse proxy)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4005',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 