const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const body = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const specs = require('./swagger/swagger.js');
const env = require('dotenv').config();
const mysql = require('mysql2');

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
app.use('/', busproductoRoutes);
app.use('/', NuevosProductos);
app.use('/', ActNuevosProductos);
app.use('/', EliminarProductoRoutes);
app.use('/', authController);  
app.use('/', userController); 

// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//DB
const db_host= process.env.db_host;
const db_user = procces.env.db_user;
const db_password= process.env.db_password;
const db_name= procces.env.db_name;

const db = mysql.createConnection(
    {
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_name,
    }
)

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Tu base de datos es insana broski'  )
})

