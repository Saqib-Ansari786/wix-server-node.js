import axios from "axios";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import dotenv from "dotenv";
import WixToken from "../models/wixToken.js";
import printStatement from "../utils/printStatement.js";
dotenv.config();

const clientID = process.env.WIX_CLIENT_ID;
const clientSecret = process.env.WIX_CLIENT_SECRET;
const redirectURI = "http://localhost:4000/auth/v1/redirect-url";

export const wixGetCode = catchAsyncError(async (req, res, next) => {
  const wixAuthUrl = `https://www.wix.com/installer/install?token=${req.query.token}&appId=${clientID}&redirectUrl=${redirectURI}`;
  res.redirect(wixAuthUrl);
});

export const wixgetToken = catchAsyncError(async (req, res, next) => {
  const { code } = req.query;
  const response = await axios.post(
    "https://www.wixapis.com/oauth/access",
    {
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { access_token, refresh_token } = response.data;
  const token = await WixToken.findAll()
  if (token.length === 1){
    if (token[0].token !== refresh_token) {
      await token[0].update({ token: refresh_token });
    }else{
      printStatement("Token is same as previous token");
    }
  }
  else{
    await WixToken.create({ token: refresh_token });
  }

  printStatement("Token saved successfully");
 
  res.redirect(
    `https://www.wix.com/installer/token-received?token=${response.data.access_token}`
  );
});
