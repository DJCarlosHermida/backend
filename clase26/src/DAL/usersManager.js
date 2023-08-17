import usersModel from "./models/users.model.js"

export default class UsersManager {
    async findAll() {
        try {
            const users = await usersModel.find()
            return users
        } catch (error) {
            return error
        }
    }

    async findById(id) {
        try {
            const user = await usersModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const newUser = await usersModel.create(obj)
            return newUser
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj) {
        try {
            const updateUser = await usersModel.updateOne({_id: id}, {$set: obj})
            return updateUser
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const deleteUser = await usersModel.deleteOne({ _id: id })
            return deleteUser
        } catch (error) {
            return error
        }
    }
}