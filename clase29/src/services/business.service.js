import { businessMongo } from '../DAL/DAOs/MongoDAOs/businessMongo.js'

class BusinessService {
    async findAll() {
        try {
            const response = await businessMongo.findAll()
            return response
        } catch (error) {
            return error
        }
    }

    async findOne(id) {
        try {
            const response = await businessMongo.findOne(id)
            return response
        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const response = await businessMongo.createOne(obj)
            return response
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await businessMongo.deleteOne(id)
            return response
        } catch (error) {
            return error
        }
    }
}

export const businessService = new BusinessService()