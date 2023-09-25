import mongoose from "mongoose";

class ProductsMongo extends BasicMongo {
    constructor(model){
        super(model)
    }
}

export const OrdersMongo = new OrdersMongo(businessModel)