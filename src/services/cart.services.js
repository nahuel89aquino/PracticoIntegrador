import { CartModel } from "../DAO/models/cart.model.js";
import { ProductModel } from "../DAO/models/product.model.js";

export class CartServices{
    async getAll(){
        return await CartModel.find().populate('products.product');
    };
    async createCart(){
        try {
            const carts = await CartModel.create({products:[]});
            return carts;
        } catch (error) {
            throw new Error(error.message); 
        }
        
    };
    async addProdToCart(cid,pid,cant){
        try {
            let cart = await CartModel.findById(cid).populate('products.product');
            cart.products.push({product:pid});
            await CartModel.updateOne({_id:cid},cart)
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async deleteProducToCart(cid,pid){
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            console.log(pid);
            const newProduts = cart.products.filter((prod) => prod.product != pid );
            console.log(newProduts);
            cart.products = newProduts;
            await CartModel.updateOne({_id:cid},cart)
            return cart;
        } catch (error){
            throw new Error(error.message);

        }
    }
    async deleteAllProduct(cid){
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            cart.products=[];
            await CartModel.updateOne({_id:cid},cart)
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}