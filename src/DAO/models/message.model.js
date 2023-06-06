import { Schema, model } from "mongoose";

const schema = new Schema({
    user:{type:String,required:true}, 
    message:{type:String,required:true}
});

export default messageModel = model('message',schema);