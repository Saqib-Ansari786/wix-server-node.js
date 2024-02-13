import express from "express";
import { wixGetOrders } from "../controllers/ordersController.js";

const wixOrdersRouter = express.Router();
wixOrdersRouter.route("/").get(wixGetOrders);
export default wixOrdersRouter;