import { Router } from 'express';
const router = Router()
import usuarioController from '../controllers/usuarioController'
import verifyMiddleware from '../middlewares/authJwt'


router.get('/list', [verifyMiddleware.verifyToken, verifyMiddleware.verifyAdministrador], usuarioController.list)
router.get('/profile', [verifyMiddleware.verifyToken, verifyMiddleware.verifyPaciente], usuarioController.profile)
router.post('/register', usuarioController.add)
router.post('/login', usuarioController.login)
router.put('/update/:id', [verifyMiddleware.verifyToken, verifyMiddleware.verifyDoctor], usuarioController.update)
router.delete('/delete/:id', [verifyMiddleware.verifyToken, verifyMiddleware.verifyPaciente], usuarioController.delete)

module.exports = router;