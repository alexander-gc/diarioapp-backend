const { Schema, model } = require('mongoose');

//  La fecha y timestamp por buenas prácticas deben ser de tipo 'Date', pero el 'Date' lanza un formato muy confuso
//  en el mongoDB. Con tipo 'String' me dio la libertad de darle el formato que yo quería en el mongo.

// La imagen es de tipo 'String' porque almacena la Url del Cloudinary.
const RegisterSchema = Schema({

    fecha: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    sentimiento: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    timestamp_actualizado: {
        type: String
    },
    imagen: {
        type: String,
    }

});

module.exports = model('Register', RegisterSchema)