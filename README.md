# DiarioApp - Backend.

Backend hecho en Node Js - CRUD completo.
Base de datos utilizado: MongoDB.

El backend fue subido al servidor de Heroku.

Resúmen:
Cuenta con 1 controlador para llevar a cabo las peticiones solicitadas, las procesa y retorna resultados en Json.
1 ruta general que almacena más rutas (get, post, put, delete).
Las rutas son validadas, para que se ingresen correctamente los datos.

El backend cuenta con un modelo 'Register', que fue creado con mongoose.
Todos los campos (valor) del form se guardarán en la DB, dependiendo la petición se manipularán los datos.

El .env es para variables de entorno global.

Hecho por: Alexander Carrillo.