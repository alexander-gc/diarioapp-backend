const {response} = require('express');
const moment = require('moment')

const Register = require('../models/Register');

//Mostrar lista del diario.
const mostrarRegistro = async (req, res=response) => {

    const registros = await Register.find()
    
    res.status(201).json({
        ok: true,
        msg: 'Mostrando registros..',
        registros
    })
}

//Agregando un registro.
const agregarRegistro = async (req, res=response) => {

    /* TIMESTAMP Y FECHA: LISTO FORMATO */
    const timestamp =  moment().subtract(6, 'hours').format("DD-MM-YYYY - HH:mm:ss a");

    //const timestamp =  moment().format("HH:mm:ss a")

    const fecha = moment().format('dddd DD MMMM YYYY');

    const registro = new Register({
        ...req.body,
        timestamp,
        fecha
    });

    try {
        
        const guardarRegistro = await registro.save();
        
        res.status(201).json({
            ok: true,
            msg: 'Se agregó correctamente el nuevo registro...',
            registro: guardarRegistro
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }

}

//Editando un registro.
const editarRegistro = async (req, res=response) => {

    // Timestamp de la última modificación.

    const timestamp_actualizado =  moment().format("HH:mm:ss a");

    const registroId = req.params.id;

    try {
        
        const registro = await Register.findById( registroId )

            if (!registro) {
                res.status(404).json({
                    ok: false,
                    mg: 'El registro no existe con ese id'
                })
            }

            const nuevoRegistro = {
                ...req.body,
                timestamp_actualizado
            }

            const registroActualizado = await Register.findByIdAndUpdate( registroId, nuevoRegistro, {new: true} );
            
            res.status(201).json({
                ok: true,
                msg: 'Registro actualizado...',
                registro: registroActualizado
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error'       
        })
    }
}

const eliminarRegistro = async (req, res=response) => {

    const registroId = req.params.id;

    try {
        
        const registro = await Register.findById( registroId );

            if(!registro) {
                res.status(404).json({
                    ok: false,
                    msg: 'El registro no existe con ese id'
                })
            }

            await Register.findByIdAndDelete( registroId )
            
            res.status(201).json({
            ok: true,
            msg: 'Registro eliminado...'
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }
}

module.exports = {
    mostrarRegistro,
    agregarRegistro,
    editarRegistro,
    eliminarRegistro
}