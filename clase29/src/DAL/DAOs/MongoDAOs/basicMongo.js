export default class BasicMongo {
    constructor(model) {
        this.model = model
    }

    async findAll() {
        try {
            const response = await this.Model.find()
            return response
        } catch (error) {
            return error
        }
    }

    async findOneById(id) {
        try {
            const response = await this.Model.findById(id)
            return response
        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const response = await this.Model.create(obj)
            return response
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await this.Model.deleteOne({ _id: id })
            return response
        } catch (error) {
            return error
        }
    }
}           