import { Router, query } from "express";
import { CartServices } from "../services/cart.services.js";
import CartManager from "../DAO/cartManger.js";
import ProductManager from "../DAO/productManger.js";


const routerCarts = Router();
const cartManger = new CartManager("./carritos.json");
const cartServices = new CartServices();
const prodManger = new ProductManager("./productos.json");

routerCarts.get("/", async(req,res) =>{
    try {
        const carts = await cartServices.getAll();
        return res.status(200).json({status:"success", carts})
    } catch (error) {
        
    }
});
routerCarts.post("/", async (req, res) => {
    try {
        const cart = await cartServices.createCart();
        return res.status(200).json({status:"success", payload: cart})
    } catch (error) {
        return res.status(500).json({status: "error", payload: error.message})
    }
    
});
routerCarts.put("/:cid", async (req,res)=>{
    const {pid,cant} = req.body;
    const cid = req.params.cid;
    try {
        const cart = await cartServices.addProdToCart(cid,pid,cant);
        return res.status(200).json({status:"success", payload: cart})
    } catch (error) {
        return res.status(500).json({status: "error", payload: error.message})
    }
});
routerCarts.delete("/:cid/products/:pid", async (req,res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const cart = await cartServices.deleteProducToCart(cid,pid);
        return res.status(200).json({status:"success", payload: cart})
    } catch (error) {
        return res.status(500).json({status: "error", payload: error.message})
    }

});
routerCarts.delete("/:cid", async (req,res) =>{
    const cid = req.params.cid;
    try {
        const cart = await cartServices.deleteAllProduct(cid);
        return res.status(200).json({status:"success", payload: cart})
    } catch (error) {
        return res.status(500).json({status: "error", payload: error.message})
    }

});
// routerCarts.get("/:cip", async (req, res) => {
//     try {
//         const products = await cartManger.getListProducts(req.params.cip);
//         return res.status(200).json({status:"success", products});
//     } catch (error) {
//         return res.status(500).json({status: "error", payload: "cart not found!"})
//     }

// });
// routerCarts.post("/:cip/products/:pid", async (req, res) => {
//     try {
//         const prod = await prodManger.getProductById(req.params.pid);
//         if (prod){
//             try {
//                 const pid = prod.id;
//                 await cartManger.addProductToCart(req.params.cip, pid)
//                 return res.status(200).json({status:"success",  payload: "added product"});
//             } catch (error) {
//                 return res.status(500).json({status: "error", payload: "cart not found!"})
//             }
//         }else{
//             return res.status(500).json({status: "error", payload: "product not found!"})
//         }
//     } catch (error) {
//         return res.status(500).json({status: "error", payload: error.message})
//     }

// });

export default routerCarts;


