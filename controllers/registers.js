const {response} = require('express');
const moment = require('moment')

const Register = require('../models/Register');

//Mostrar lista del diario. No requiere pedir data ni el id.
const mostrarRegistro = async (req, res=response) => {

    const registros = await Register.find()
    
    res.status(201).json({
        ok: true,
        msg: 'Mostrando registros..',
        registros,
    })
}

//Agregando un registro. Se pedirá ingresar la data.
const agregarRegistro = async (req, res=response) => {

    //Timestapm generado en el momento del registro. Con formato listo por el momentJs.
    //Se le restará 6 horas, porque el servidor heroku está en zona horaria de EU (La zona horaria de EU nos lleva 6hrs aprox).
    //Así el valor del timestamp sea de la zona horaria de México.
    const timestamp =  moment().subtract(6, 'hours').format("DD-MM-YYYY - HH:mm:ss a");

    const registro = new Register({
        ...req.body,
        timestamp,
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

//Editando un registro. Se pedirá id y la nueva data.
const editarRegistro = async (req, res=response) => {

    // Hay un timestamp inicial del registro, pero también agregué un timestamp adicional.
    // El adicional es para almacenar la última modificación (Edit) que se le hizo a un registro, luego de ser creada.

    const timestamp_actualizado =  moment().subtract(6, 'hours').format("DD-MM-YYYY - HH:mm:ss a");

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

// Eliminando un registro. Solo pedirá el id.
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