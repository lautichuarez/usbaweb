// server.js - Configurado para Render
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Importante para Render

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor ejecutándose en: http://${HOST}:${PORT}`);
  console.log(`📁 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🗄️  Base de datos: ${process.env.DB_HOST}`);
});

// Manejo de errores global
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('📴 SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado');
    process.exit(0);
  });
});
