import { findAll, findById, createOne } from '../services/users.service.js'

export const findAllUsers = async (req, res) => {
    try {
        const users = await findAll()
        if (users.length) {
            res.status(200).json({ message: 'Users Found', users })
        } else {
            res.status(200).json({ message: 'No Users' })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const findOneUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await findById(id)
        if (user) {
            res.status(200).json({ message: 'Users Found', user })
        } else {
            res.status(200).json({ message: 'No Users' })
        }
    } catch (error) {

    }
}
