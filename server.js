const verifyToken = require('./middlewares/verifyToken');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// Configuración de entorno
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión mejorada a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    console.log('\n🔑 Consejos para solucionar:');
    console.log('1. Verifica que tu IP esté en la whitelist de MongoDB Atlas');
    console.log('2. Revisa que tu MONGO_URI sea correcta en el .env');
    console.log('3. Asegúrate que el usuario y contraseña sean correctos');
    console.log('4. Verifica que tu cluster en Atlas esté activo\n');
    process.exit(1);
  }
}

// Modelo de Usuario
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

// Configuración de rutas
app.post('/register', async (req, res) => {
  /* ... (mantén tu código existente) ... */
});

// Iniciar servidor
async function start() {
  await connectDB();
  
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    console.log('🔗 MongoDB Atlas conectado correctamente');
  });
}

start().catch(err => {
  console.error('🔥 Error fatal:', err);
  process.exit(1);
});