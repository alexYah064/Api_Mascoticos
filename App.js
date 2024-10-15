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
    'https://alexyah064.github.io', // Asegúrate de que está escrito correctamente
    'http://127.0.0.1:5501', // Permite solicitudes desde localhost
    'http://localhost:5501' // Permite otro posible origen local
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowed.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));

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
