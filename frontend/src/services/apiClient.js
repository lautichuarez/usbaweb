// src/services/apiClient.js
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || `Error ${response.status}`);
  }

  return data;
};

export const getBienvenida = () => request('/bienvenida');
export const getAnuncios = () => request('/anuncios');
export const getCarrusel = () => request('/carrusel');
export const getTorneos = () => request('/torneos');
export const getCategorias = () => request('/categorias');

export const login = (credenciales) =>
  request('/auth/ingresar', {
    method: 'POST',
    body: JSON.stringify(credenciales),
  });

export const registrarse = (datos) =>
  request('/auth/inscribirse', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
