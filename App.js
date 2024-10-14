const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const body = require('body-parser');

// Controladores
const authController = require('./Controllers/authController'); // Corregido el path
const userController = require('./Controllers/userController'); // Corregido el path

// Importar las rutas
const busproductoRoutes = require('./routes/Buscador_Routers');
const NuevosProductos = require('./routes/NuevoProducto_Router');
const ActNuevosProductos = require('./routes/ActualizarProd_Routers');
const EliminarProductoRoutes = require('./routes/EliminarProducto_Router');
const allowed = [
'https://alexYah064.githhub.io'

]

// Middlewares
app.use(cors({
    origin : allowed,
    methods : ['GET', 'POST', 'PUT'],
    credentials : true
}
));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('Models')); // Asegúrate de que la carpeta 'Models' exista
app.use(body.urlencoded({ extended: false }));
app.use(body.json()); 

// Rutas
app.use('/api', busproductoRoutes);
app.use('/api', NuevosProductos);
app.use('/api', ActNuevosProductos);
app.use('/api', EliminarProductoRoutes);
app.use('/api/auth', authController);  // Ruta para login
app.use('/api/users', userController); // Rutas para usuarios

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
