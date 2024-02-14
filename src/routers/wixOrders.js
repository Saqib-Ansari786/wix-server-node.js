import express from "express";
import { wixGetOrders } from "../controllers/ordersController.js";
import { wixRefreshToken } from "../middlewares/refreshToken.js";

const wixOrdersRouter = express.Router();
wixOrdersRouter.route("/").get(wixRefreshToken, wixGetOrders);
export default wixOrdersRouter;