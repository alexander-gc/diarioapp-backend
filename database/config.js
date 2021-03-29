const mongoose = require('mongoose');

const dbConexion = async () => {

    try {
        
        await mongoose.connect(process.env.DB_CONEX, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos Online');

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }

}

module.exports = {
    dbConexion
}