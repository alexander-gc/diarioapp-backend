/* 
    Ruta de registros.
    host + /api/diario
*/

const {Router} = require('express');
const { check } = require('express-validator') 

const { validarCampos } = require('../middlewares/validarCampos');
const { mostrarRegistro, agregarRegistro, editarRegistro, eliminarRegistro } = require('../controllers/registers')

//const { isDate } = require('../helpers/isDate')
//const { isTime } = require('../helpers/isTime')

const router = Router();

//Mostrar/obtener lista del diario.
router.get('/', mostrarRegistro);

// Crear/agregar un registro del diario.
router.post(
    '/agregar', 
    [
        //check('fecha', 'Ingresa la fecha de hoy').custom( isDate ),
        //check('timestamp', 'Timestamp').custom( isTime ),        
        check('sentimiento', 'Ingresa cómo te sentiste hoy').not().isEmpty(),
        check('descripcion', 'Describe cómo fue tu día').not().isEmpty(),
        check('imagen', 'Ingresa una imagen de referencia').not().isEmpty(),
        validarCampos
    ],
    agregarRegistro
    );

// Editando un registro del diario.
router.put('/:id', 
    [
        //check('fecha', 'Ingresa la fecha de hoy').custom( isDate ),
        //check('timestamp', 'Timestamp').custom( isTime ),        
        check('sentimiento', 'Ingresa cómo te sentiste hoy').not().isEmpty(),
        check('descripcion', 'Describe cómo fue tu día').not().isEmpty(),
        check('imagen', 'Ingresa una imagen de referencia').not().isEmpty(),
        validarCampos
    ],
    editarRegistro
    );

// Eliminando un registro del diario.
router.delete('/:id', eliminarRegistro);

module.exports = router;