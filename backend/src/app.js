// src/app.js - Configurado para Render
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// ==================== CONFIGURACIÓN CORS ====================
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
console.log(`🔓 CORS habilitado para: ${process.env.CORS_ORIGIN || 'localhost:5173'}`);

// ==================== MIDDLEWARE ====================
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// ==================== RUTAS BÁSICAS ====================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'API funcionando',
    db: process.env.DB_HOST ? 'Conectada' : 'No configurada'
  });
});

// ==================== IMPORTAR RUTAS ====================
// Descomenta según tus controladores
// const adminRoutes = require('./routes/admin');
// const torneoRoutes = require('./routes/torneo');
// const jugadorRoutes = require('./routes/jugador');

// app.use('/api/admin', adminRoutes);
// app.use('/api/torneos', torneoRoutes);
// app.use('/api/jugadores', jugadorRoutes);

// ==================== MANEJO DE ERRORES ====================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development'
  });
});

// ==================== RUTA 404 ====================
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
});

module.exports = app;
