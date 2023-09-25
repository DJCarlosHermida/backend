import { businessModel } from '../../mongoDB/models/business.model.js'

class OrdersMongo extends BasicMongo {
    constructor(model){
        super(model)
    }
}

export const OrdersMongo = new OrdersMongo(businessModel)