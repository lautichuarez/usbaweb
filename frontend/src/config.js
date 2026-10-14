export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Base sin /api/v1, para las imágenes subidas
export const BASE_URL = API_URL.replace(/\/api\/v1\/?$/, '');
