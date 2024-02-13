import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import passportStrategy from "./src/middlewares/passportStrategy.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import wixOauthRouter from "./src/routers/wixOauthRouter.js";
import wixProductsRouter from "./src/routers/wixProducts.js";

// configuration for .env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// setup for passport strategies -- e.g google strategy for login and signup
passportStrategy();
app.use(passport.initialize());

// all routes of the app
// app.use(`/api/v1`, userRouter);
app.use("/api/v1/auth", wixOauthRouter);
app.use("/api/v1",wixProductsRouter );
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// end point if any error occurs in main controllers/endpoints
app.use(errorMiddleware);

export default app;
