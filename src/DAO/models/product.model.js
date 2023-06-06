import { Schema, model } from "mongoose";

const schema = new Schema({
title:{type: String, required:true},
description:{type: String, required:true},
price:{type: Number, required:true},
thumbnail:{type: String, required:false},
code:{type: String, required:true},
stock:{type: Number, required:true},
category:{type: String, required:true},
status:{type: Boolean, required:true,default:true}
});

export const ProductModel = model('product',schema);
