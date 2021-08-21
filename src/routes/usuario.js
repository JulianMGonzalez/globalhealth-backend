import { Router } from 'express';
const router = Router()
const usuarioController = require('../controllers/usuarioController');


router.get('/list', usuarioController.list)
router.post('/register', usuarioController.add)
router.post('/login', usuarioController.login)

module.exports = router;