import axios from "axios";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { wixRefreshToken } from "../middlewares/refreshToken.js";

const wixBaseUrl = "https://www.wixapis.com/stores/v1/products";

export const queryProducts = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    const {data} = await axios.post(`${wixBaseUrl}/query`, {} , { headers: { authorization: access_token } });
    res.status(200).json({
        status: "success",
        data: data
    });
});

export const createProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    const {data} = await axios.post(`${wixBaseUrl}`, req.body , { headers: { authorization: access_token } });
    res.status(200).json({
        status: "success",
        data: data
    });
});


export const updateProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    const {data} = await axios.patch(`${wixBaseUrl}/${req.params.id}`, req.body , { headers: { authorization: access_token } });
    res.status(200).json({
        status: "success",
        data: data
    });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    const {data} = await axios.delete(`${wixBaseUrl}/${req.params.id}`, { headers: { authorization: access_token } });
    res.status(200).json({
        status: "success",
        data: data
    });
});

export const getProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    const {data} = await axios.get(`${wixBaseUrl}/${req.params.id}`, { headers: { authorization: access_token } });
    res.status(200).json({
        status: "success",
        data: data
    });
});
