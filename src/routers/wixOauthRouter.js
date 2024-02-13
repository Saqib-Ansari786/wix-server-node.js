import express from "express";
import {
  wixGetCode,
  wixgetToken,
} from "../controllers/wixOauth.js";
const wixAuthRouter = express.Router();

wixAuthRouter.route("/app-url").get(wixGetCode);
wixAuthRouter.route("/redirect-url").get(wixgetToken);

export default wixAuthRouter;
