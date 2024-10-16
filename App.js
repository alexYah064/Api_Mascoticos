const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const body = require('body-parser');
const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger/swagger.js')
// Controladores
const authController = require('./Controllers/authController'); 
const userController = require('./Controllers/userController'); 

// Importar las rutas
const busproductoRoutes = require('./routes/Buscador_Routers');
const NuevosProductos = require('./routes/NuevoProducto_Router');
const ActNuevosProductos = require('./routes/ActualizarProd_Routers');
const EliminarProductoRoutes = require('./routes/EliminarProducto_Router');

const allowed = [
    'https://alexyah064.github.io', 
    'http://127.0.0.1:5501', 
    'http://localhost:3000'
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

app.use("/docs", swaggerUI.serve,swaggerUI.setup(specs))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('Models')); 
app.use(body.urlencoded({ extended: false }));
app.use(body.json()); 

// Rutas
app.use('/api', busproductoRoutes);
app.use('/api', NuevosProductos);
app.use('/api', ActNuevosProductos);
app.use('/api', EliminarProductoRoutes);
app.use('/api/auth', authController);  
app.use('/api/users', userController); 

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
