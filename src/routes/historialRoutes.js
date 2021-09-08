import { Router } from 'express';
const router = Router()
import historialClinicoController from "../controllers/historialClinicoController";

router.get('/', historialClinicoController.list)
router.post('/', historialClinicoController.create)
router.put('/activate/:id', historialClinicoController.activate)
router.put('/deactivate/:id', historialClinicoController.deactivate)

module.exports = router