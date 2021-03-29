const { Schema, model } = require('mongoose');

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
    }

});

module.exports = model('Register', RegisterSchema)