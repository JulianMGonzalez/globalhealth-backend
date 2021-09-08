import { Router } from 'express';
const router = Router()
const usuarioRouter = require('./usuarioRoutes');
const historialRoutes = require('./historialRoutes');


router.use('/usuario', usuarioRouter);
router.use('/historial', historialRoutes)

module.exports = router;