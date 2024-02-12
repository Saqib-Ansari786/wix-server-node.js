import express from "express";
import {
  wixGetCode,
  wixgetToken,
  wixRefreshToken,
} from "../controllers/wixOauth.js";
const wixAuthRouter = express.Router();

wixAuthRouter.route("/app-url").get(wixGetCode);
wixAuthRouter.route("/redirect-url").get(wixgetToken);
wixAuthRouter.route("/refresh-token").get(wixRefreshToken);

export default wixAuthRouter;
