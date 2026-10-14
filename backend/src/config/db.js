import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true'
      ? { ssl: { rejectUnauthorized: false } }
      : {},
  }
);

try {
  await sequelize.authenticate();
  console.log('📦 ¡Base de datos MySQL en Aiven conectada con éxito!');
} catch (error) {
  console.error('❌ Error al conectar a la base de datos:', error.original?.code || '', error.message);
}

export default sequelize;
