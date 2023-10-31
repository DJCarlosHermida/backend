import { usersController } from "../controllers/users.controller.js";
import { Router } from "express";

const router = Router()

router.get('/', usersController.findAllUsers)
router.get('/:idUser', usersController.findOneUser)
router.post('/', usersController.createOneUser)
router.delete('/:idUser', usersController.deleteOneUser)

export default router