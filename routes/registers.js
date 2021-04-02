/* 
    Ruta de registros.
    host + /api/diario
*/

const {Router} = require('express');
const { check } = require('express-validator'); //Para validar los campos del form. Si no se ingresa un valor, se activará el check.

const { validarCampos } = require('../middlewares/validarCampos');
const { mostrarRegistro, agregarRegistro, editarRegistro, eliminarRegistro } = require('../controllers/registers')

const router = Router();

// Obtener lista del diario.
router.get('/', mostrarRegistro);

// Crear un registro del diario.
router.post(
    '/agregar', 
    [
        check('fecha', 'Ingresa la fecha de hoy').not().isEmpty(),
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
        check('fecha', 'Ingresa la fecha de hoy').not().isEmpty(),
        check('sentimiento', 'Ingresa cómo te sentiste hoy').not().isEmpty(),
        check('descripcion', 'Describe cómo fue tu día').not().isEmpty(),
        check('imagen', 'Ingresa una imagen de referencia').not().isEmpty(),
        validarCampos
    ],
    editarRegistro
    );

// Eliminando un registro del diario.
router.delete('/eliminar/:id', eliminarRegistro);

module.exports = router;