/*
id_cart
products:{
    id_product
quantity
}*/

import { Schema,model } from "mongoose";

const schema = new Schema({
    products:[{
        id_product:{type:String,required:true},
        quentity:{type:Number,default:1}
    }]
});

export default cartModel = model('cart', schema);