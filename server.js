const verifyToken = require('./middlewares/verifyToken');

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar las variables de entorno
dotenv.config();

// Inicialización de la app
const app = express();

// Middleware
app.use(cors());  // Permitir solicitudes CORS
app.use(express.json());  // Parsear el cuerpo de las solicitudes JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000, // subimos a 15 segundos
  bufferCommands: false,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB', err));

// Esquema de Usuario
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Ruta de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('Usuario registrado');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(403).json({ message: 'Usuario no encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
});

// Ruta para restablecer la contraseña
app.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
});





// Ruta protegida de ejemplo
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.username}` });
});

// Rutas de clientes
const clientsRouter = require("./routes/clients");
app.use("/clients", clientsRouter);

// Arrancar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
