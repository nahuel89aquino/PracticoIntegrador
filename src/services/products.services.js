import {ProductModel} from "../DAO/models/product.model.js";

export class ProductService{
    async getAll(){
        try {
            const products = await ProductModel.find();
            return products;
            
        } catch (error) {
            throw error.message;
        }
    }
    getSome(limit=null){
        const products = this.getAll();
        if (!limit){
            return products;
        }
        if (limit <= products.length || limit === 0){
            const sliceProd = products.slice(null,limit);
            return sliceProd;
            
        }else{
            throw new Error("Limit not found!");
        }
    }
    async getById(pid){
        try {
            const product = await ProductModel.findById(pid);
            if (product){
                return product;
            }else{
                return new Error("Product not found!");
            } 
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createOne(data){
        if (data.id){
            throw new Error("ID field not allowed");
        }
        try {
            const {title,
                   description,
                   price,
                   thumbnail,
                   code,
                   stock,
                   category,
                   status} = data;
    
            const product = await ProductModel.create(title,description,price,thumbnail,code,stock,category,status);
            return product;
            
        } catch (error) {
            throw new Error(error.message);  
        }
    }
    async updateOne(pid,data){
        try {
            const product = await ProductModel.updateOne({_id:pid},data);
            return product;
            
        } catch (error) {
            throw new Error(error.message);
            
        }
    }

    async delete(pid){
        try {
            const product = await ProductModel.deleteOne({_id:pid});
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}