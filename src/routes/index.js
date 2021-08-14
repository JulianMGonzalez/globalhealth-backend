import { Router } from 'express';
const router = Router()
const usuarioRouter = require('./usuario');


router.use('/usuario', usuarioRouter);

module.exports = router;