import axios from "axios";
import catchAsyncError from "./catchAsyncError.js";
import WixToken from "../models/wixToken.js";
import dotenv from "dotenv";
dotenv.config();

export const wixRefreshToken = async () => {
  const refreshToken = await WixToken.findOne({ where: { id: 2 } });

  if (!refreshToken) {
    return Promise.reject(new Error("No refresh token found"));
  }

  try {
    const response = await axios.post(
      "https://www.wixapis.com/oauth/access",
      {
        client_id: process.env.WIX_CLIENT_ID,
        client_secret: process.env.WIX_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken.token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    console.log(access_token, "------------------------i m in refresh token");

    return {
      access_token,
      refresh_token,
    };
  } catch (error) {
    return Promise.reject(new Error("Error while refreshing token"));
  }
};
