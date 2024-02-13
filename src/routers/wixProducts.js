import express from "express";
import { createProduct, deleteProduct, getProduct, queryProducts, updateProduct } from "../controllers/productsController.js";


const wixProductsRouter = express.Router();

wixProductsRouter.route("/getProducts").get(queryProducts);
wixProductsRouter.route("/createProduct").post(createProduct);
wixProductsRouter.route("/updateProduct/:id").put(updateProduct);
wixProductsRouter.route("/deleteProduct/:id").delete(deleteProduct);
wixProductsRouter.route("/getProduct/:id").get(getProduct);

export default wixProductsRouter;