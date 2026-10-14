import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt'); // Usamos require para evitar problemas de ESM
import path from 'path';

// IMPORTANTE: Ajustá esta ruta si tu archivo de modelos no está ahí
const models = await import('./src/models/index.js'); 

// Extraemos los modelos de forma flexible
const db = models.default || models;
const Usuario = db.Usuario || db.usuario || db.User || db.user;
const sequelize = Usuario.sequelize || db.sequelize;

async function runSeed() {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conexión a BD establecida.');

        const emailAdmin = 'admin@usba.com';
        const passwordPlana = 'admin123';
        
        // Hasheamos correctamente aquí
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(passwordPlana, salt);

        const [admin, created] = await Usuario.findOrCreate({
            where: { correo: emailAdmin },
            defaults: {
                correo: emailAdmin,
                contraseña: passwordHasheada,
                rol: 'admin'
            }
        });

        if (!created) {
            await admin.update({ contraseña: passwordHasheada, rol: 'admin' });
            console.log('⚠️ El usuario ya existía. Contraseña hasheada y actualizada.');
        } else {
            console.log('✅ Usuario administrador creado con contraseña hasheada.');
        }

    } catch (error) {
        console.error('🔴 Error:', error);
    } finally {
        process.exit();
    }
}

runSeed();