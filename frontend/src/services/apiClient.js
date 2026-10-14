// src/services/apiClient.js - Cliente API para Render

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log(`🌐 API URL: ${API_BASE_URL}`);

/**
 * Función genérica para hacer peticiones al API
 * @param {string} endpoint - Ruta del endpoint (ej: '/torneos')
 * @param {object} options - Opciones de fetch
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include' // Para cookies/sesiones
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    // ==================== MANEJO DE RESPUESTAS ====================
    if (response.status === 401) {
      // No autenticado - redirigir a login
      window.location.href = '/login';
      throw new Error('No autenticado');
    }

    if (response.status === 403) {
      throw new Error('No tienes permisos para esta acción');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Error en ${endpoint}:`, error.message);
    throw error;
  }
};

// ==================== MÉTODOS ESPECÍFICOS ====================

export const getTorneos = async () => {
  return apiCall('/torneos');
};

export const getTorneo = async (id) => {
  return apiCall(`/torneos/${id}`);
};

export const createTorneo = async (data) => {
  return apiCall('/torneos', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateTorneo = async (id, data) => {
  return apiCall(`/torneos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteTorneo = async (id) => {
  return apiCall(`/torneos/${id}`, {
    method: 'DELETE'
  });
};

// ==================== EQUIPOS ====================

export const getEquipos = async () => {
  return apiCall('/equipos');
};

export const createEquipo = async (data) => {
  return apiCall('/equipos', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// ==================== JUGADORES ====================

export const getJugadores = async () => {
  return apiCall('/jugadores');
};

export const createJugador = async (data) => {
  return apiCall('/jugadores', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// ==================== PARTIDOS ====================

export const getPartidos = async () => {
  return apiCall('/partidos');
};

export const createPartido = async (data) => {
  return apiCall('/partidos', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// ==================== ADMIN ====================

export const getAdminStats = async () => {
  return apiCall('/admin/stats');
};

export const getAdminUsers = async () => {
  return apiCall('/admin/users');
};

// ==================== EJEMPLO DE USO EN UN COMPONENTE ====================
/*

import { useEffect, useState } from 'react';
import { getTorneos } from './services/apiClient';

export default function TorneosPage() {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTorneos = async () => {
      try {
        setLoading(true);
        const data = await getTorneos();
        setTorneos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarTorneos();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {torneos.map(torneo => (
        <div key={torneo.id}>
          <h3>{torneo.nombre}</h3>
          <p>{torneo.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

*/
