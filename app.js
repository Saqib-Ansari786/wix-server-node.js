import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import passportStrategy from "./src/middlewares/passportStrategy.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import wixOauthRouter from "./src/routers/wixOauthRouter.js";
import wixProductsRouter from "./src/routers/wixProducts.js";
import wixOrdersRouter from "./src/routers/wixOrders.js";
// configuration for .env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// setup for passport strategies -- e.g google strategy for login and signup
passportStrategy();
app.use(passport.initialize());

// all routes of the app
// app.use(`/api/v1`, userRouter);
app.use("/auth/v1", wixOauthRouter);
app.use("/api/v1/products",wixProductsRouter );
app.use("/api/v1/orders",wixOrdersRouter );

app.get("/", (req, res) => {
  res.send("Server is Running");
});

// end point if any error occurs in main controllers/endpoints
app.use(errorMiddleware);

export default app;
