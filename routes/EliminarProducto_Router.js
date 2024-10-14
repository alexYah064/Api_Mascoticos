const express = require('express');
const router = express.Router();

const EliminarPro_Controller = require('../Controllers/EliminarPro_Controller');
const EliminarProductoRepository = require('../Repositories/EliminarProductoRepository');
const EliminarProductoServ = require('../Services/EliminarProductoServ');

const eliminarProductoRepository = new EliminarProductoRepository();
const eliminarProductoServ = new EliminarProductoServ(eliminarProductoRepository);
const eliminarProductoController = new EliminarPro_Controller(eliminarProductoServ);

// Ruta para eliminar un producto
router.delete('/Eliminar/productos/:id', (req, res) => eliminarProductoController.eliminarProducto(req, res));

module.exports = router;
