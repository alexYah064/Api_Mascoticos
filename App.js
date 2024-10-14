const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const body = require('body-parser')

const authController = require('../apiv.1/Controllers/authController');
const userController = require('../apiv.1/Controllers/userController')

// Importar las rutas
const busproductoRoutes = require('./routes/Buscador_Routers');
const NuevosProductos = require('./routes/NuevoProducto_Router');
const ActNuevosProductos = require('./routes/ActualizarProd_Routers');
const EliminarProductoRoutes = require('./routes/EliminarProducto_Router'); // Agregado

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('Models'))
app.use(body.urlencoded({extended: false}))
app.use(body.json()) 

// Rutas
app.use('/api', busproductoRoutes);
app.use('/api', NuevosProductos);
app.use('/api', ActNuevosProductos);
app.use('/api', EliminarProductoRoutes); // Agregado
app.use('/api', authController);  // Ruta para que se fokin logien
app.use('/api', userController);  // Rutas de Usuaroskis
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
