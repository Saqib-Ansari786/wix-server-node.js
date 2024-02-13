import axios from "axios";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { wixRefreshToken } from "../middlewares/refreshToken.js";

const wixBaseUrl = "https://www.wixapis.com/ecom/v1/orders";

export const wixGetOrders = catchAsyncError(async (req, res, next) => {
  const { access_token } = await wixRefreshToken();
try {
    const { data } = await axios.post(`${wixBaseUrl}/search`,{search:{}}, { headers: { authorization: access_token } });
    res.status(200).json({
      status: "success",
      data: data,
    });
} catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: "Error while fetching orders",
    });
}

});


