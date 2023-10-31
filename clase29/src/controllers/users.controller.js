import { userService } from "../services/users.service.js"

class UsersController {
    async findAllUsers(req, res) {
        try {
            const allUsers = await userService.findAll()
            res.json({ message: 'Users Found', allUsers })
        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }

    async findOneUser(req, res) {
        const { idUser } = req.params
        try {
            const user = await userService.findOne(idUser)
            res.json({ message: 'User Found', user })
        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }

    async createOneUser(req, res) {
        const { first_name, last_name, email, password, role } = req.body
        if (!first_name || !last_name || !email || !password) {
            res.json({ message: 'Missing Data' })
        }
        try {
            const newUser = await userService.createOne(req.body)
            res.json({ message: 'User Created', newUser })
        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }

    async deleteOneUser(req, res) {
        const { idUser } = req.params
        try {
            const user = await userService.deleteOne(idUser)
            res.json({ message: 'User Deleted', user })
        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }
}

export const usersController = new UsersController()