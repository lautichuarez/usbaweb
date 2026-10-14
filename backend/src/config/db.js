const mysql = require('mysql2/promise');
require('dotenv').config();

// Creamos el pool directamente usando la URL pública de Railway
const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);

// Probar la conexión al iniciar
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('📦 ¡Base de datos MySQL en Railway conectada con éxito!');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
  }
};

testConnection();

module.exports = pool;
