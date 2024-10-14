const express = require('express');
const router = express.Router();

const ProductoController = require('../Controllers/Buscador_Controllers');
const BuscadorProductoSer = require('../Services/BuscadorProductoSer');
const ProductoRespository = require('../Repositories/ProductoRespository');

// Instanciar las capas con el JSON como origen de datos
const productoRespository = new ProductoRespository();
const ProductoService = new BuscadorProductoSer(productoRespository);
const productoController = new ProductoController(ProductoService);

// Rutas
router.get('/productos', (req, res) => productoController.obtenerProductos(req, res));
router.get('/producto/:id', (req, res) => productoController.obtenerProductosporId(req, res));

module.exports = router;
