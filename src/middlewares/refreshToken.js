import axios from "axios";
import WixToken from "../models/wixToken.js";
import dotenv from "dotenv";
import catchAsyncError from "./catchAsyncError.js";
dotenv.config();

export const wixRefreshToken = catchAsyncError  (async (req, res, next) => {
  const refreshToken = await WixToken.findAll();
  if (!refreshToken) {
    return next(new Error("No refresh token found"));
  }

  try {
    const response = await axios.post(
      "https://www.wixapis.com/oauth/access",
      {
        client_id: process.env.WIX_CLIENT_ID,
        client_secret: process.env.WIX_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken[0].token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token } = response.data;
    req.access_token = access_token;
    next();
    
  } catch (error) {
    return next(new Error("Error while refreshing token"));
  }
});

 