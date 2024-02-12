import axios from "axios";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import dotenv from "dotenv";
dotenv.config();

const clientID = process.env.WIX_CLIENT_ID;
const clientSecret = process.env.WIX_CLIENT_SECRET;
const redirectURI = "http://localhost:4000/api/v1/auth/redirect-url";

export const wixGetCode = catchAsyncError(async (req, res, next) => {
  const wixAuthUrl = `https://www.wix.com/installer/install?token=${req.query.token}&appId=${clientID}&redirectUrl=${redirectURI}`;
  res.redirect(wixAuthUrl);
});

export const wixgetToken = catchAsyncError(async (req, res, next) => {
  const { code } = req.query;
  const response = await axios.post(
    "https://www.wix.com/oauth/access",
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
  console.log(response.data);
  res.redirect(
    `https://www.wix.com/installer/token-received?token=${response.data.access_token}`
  );
});

export const wixRefreshToken = catchAsyncError(async (req, res, next) => {
  const { refreshToken } = req.query;
  const response = await axios.post(
    "https://www.wix.com/oauth/access",
    {
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  res.status(200).json({
    success: true,
    data: response.data,
  });
});
