const express = require('express');
const router = express.Router();

const ActualizarPro_Controller = require('../Controllers/ActualizarPro_Controller');
const ActualizarProductoRepository = require('../Repositories/ActualizarProductoRepository');
const ActualizarProductoServ = require('../Services/ActualizarProductoSer');

const actualizarProductoRepository = new ActualizarProductoRepository();
const actualizarProductoServ = new ActualizarProductoServ(actualizarProductoRepository);
const actProductoController = new ActualizarPro_Controller(actualizarProductoServ);

router.put('/Actualizar/productos/:id', (req, res) => actProductoController.actualizarProducto(req, res));

module.exports = router;
