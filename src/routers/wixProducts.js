import express from "express";
import { createProduct, deleteProduct, getProduct, queryProducts, updateProduct } from "../controllers/productsController.js";
import { wixRefreshToken } from "../middlewares/refreshToken.js";


const wixProductsRouter = express.Router();

wixProductsRouter.route("/").get(wixRefreshToken, queryProducts);
wixProductsRouter.route("/product").post(wixRefreshToken, createProduct);
wixProductsRouter.route("/product/:id").put(wixRefreshToken, updateProduct).delete(wixRefreshToken, deleteProduct).get(wixRefreshToken, getProduct);


export default wixProductsRouter;