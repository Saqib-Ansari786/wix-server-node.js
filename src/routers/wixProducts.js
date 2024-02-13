import express from "express";
import { createProduct, deleteProduct, getProduct, queryProducts, updateProduct } from "../controllers/productsController.js";


const wixProductsRouter = express.Router();

wixProductsRouter.route("/products").get(queryProducts);
wixProductsRouter.route("/product").post(createProduct);
wixProductsRouter.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProduct);


export default wixProductsRouter;