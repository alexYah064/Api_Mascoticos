const express = require('express');
const router = express.Router();

const NuvPro_Controller = require('../Controllers/NuevoPro_Controller');
const NuevosProductosServ = require('../Services/NuevosProductosServ');
const NuevoProductoRepository = require('../Repositories/NuevoProductoRepository');

// Instanciar las capas con el JSON como origen de datos
const nuevoProductoRepository = new NuevoProductoRepository();
const nuevoProductoService = new NuevosProductosServ(nuevoProductoRepository);
const nuevoProController = new NuvPro_Controller(nuevoProductoService);

// Ruta para crear un nuevo producto
router.post('/NuevoProducto', (req, res) => nuevoProController.crearProducto(req, res));

module.exports = router;
