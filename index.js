const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;
const { dbConexion } = require('./database/config')

//Activando el servidor.
const app = express();

//Escuchando peticiones en el port 4000.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})

//Conectar a la base de datos.
dbConexion();

//CORS. Permitir solicitudes de recursos restringidos en mi página web.
app.use(cors());

//Directorio público. (HTML estático, bloqueado)
app.use( express.static('public'));

//Lectura y parseo del body. (Para que postman reconozca el formato Json).
app.use( express.json());

/* Rutas: registros( get, post, put, delete ) */
app.use('/api/diario', require('./routes/registers') );



