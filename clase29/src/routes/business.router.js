import { businessController } from "../controllers/business.controller.js";
import { Router } from 'express'

const router = Router()

router.get('/', businessController.findAllBusiness)
router.get(':idProduct', businessController.findOneBusiness)
router.post('/', businessController.createBusiness)
router.delete('idProduct', businessController.deleteBusiness)

export default router