import {ProductModel} from "../DAO/models/product.model.js";
import { PORT } from "../utils.js";

export class ProductService{
    async getAll(){
        try {
            const products = await ProductModel.find();
            return products;
            
        } catch (error) {
            throw error.message;
        }
    }
    async getSome({sort,query,req,limit=10,page=1}){
        const protocol = req.protocol; 
        const host = req.hostname;
        const url  = req.baseUrl;
        const port = PORT;
        const link = protocol +'://'+host+':'+port+url+'?page=';
        const pag = page;
        try {
            const options = {
                page:pag,
                limit:limit,
                sort:{price:sort}
            };
            const {docs,totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage
                } = await ProductModel.paginate(query,options);

            return {
                docs,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `${link}${prevPage}` : null,
                nextLink: hasNextPage ? `${link}${nextPage}` : null
            };

        } catch (error) {
            throw new Error(error.message);
            
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