const { Router } = require('express');
// Importar todos los routers;
const countries=require('./countries.js')
const activities=require('./activities.js')

// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries',countries)
router.use('/activities',activities)

module.exports = router;
