import { ordesModel } from '../../mongoDB/models/orders.model.js'
import BasicMongo from './basicMongo.js';

class OrdersMongo extends BasicMongo {
    constructor(model){
        super(model)
    }
}

export const OrdersMongo = new OrdersMongo(ordesModel)