import { Router } from 'express';
const router = Router()
const usuarioController = require('../controllers/usuarioController');


router.get('/list', usuarioController.list)
router.post('/add', usuarioController.add)

module.exports = router;