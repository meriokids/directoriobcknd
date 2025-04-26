const express = require("express");
const Client = require("../models/Client"); // Cambia la importación a require
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();


// Ruta POST para crear un cliente
router.post('/', verifyToken, async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error al guardar cliente:', error);
    res.status(500).json({ message: 'Error al guardar cliente' });
  }
});


// GET /clients (protegida por token)
router.get("/", verifyToken, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes" });
  }
});




// Ruta PUT para actualizar un cliente
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // Devuelve el cliente actualizado
    });

    if (!updatedClient) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
});



// Ruta DELETE para eliminar un cliente
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
});




module.exports = router; // Cambia la exportación a module.exports


;









