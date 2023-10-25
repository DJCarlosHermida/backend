import { usersMongo } from '../DAL/DAOs/MongoDAOs/usersMongo.js'
import { hashData } from '../utils/utils.js'
import UsersDTO from '../DAL/DTOs/users.dto.js'

class UsersService {
    async findAll() {
        try {
            const response = await usersMongo.findAll()
            return response
        } catch (error) {
            return error
        }
    }

    async findOne(id) {
        try {
            const response = await usersMongo.findOneById(id)
            return response
        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        const password = obj
        try {
            const hashPassword = hashData(password)
            const newObj = { ...obj, password: hashPassword }
            const userDTO = new UsersDTO(newObj)
            const response = await usersMongo.createOne(userDTO)
            return response
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await usersMongo.deleteOne(id)
            return response
        } catch (error) {
            return error
        }
    }
}

export const userService = new UsersService()