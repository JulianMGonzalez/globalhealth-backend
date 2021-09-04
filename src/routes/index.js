import { Router } from 'express';
const router = Router()
const usuarioRouter = require('./usuarioRoutes');


router.use('/usuario', usuarioRouter);

module.exports = router;