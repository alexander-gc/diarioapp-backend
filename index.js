const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const { dbConexion } = require('./database/config')

//Escuchando peticiones en el port 4000.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})

//Conectar a la base de datos.
dbConexion();

//CORS.
app.use(cors());

//Directorio público. (Frontend)

app.use( express.static('public'));

//Lectura y parseo del body. (En postman)

app.use( express.json());

/* Rutas: registros( get, post, put, delete )*/

app.use('/api/diario', require('./routes/registers') );



