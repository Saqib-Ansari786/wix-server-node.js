import axios from "axios";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { wixRefreshToken } from "../middlewares/refreshToken.js";

export const queryProducts = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    console.log(access_token);
    const {data} = await axios.post(`${'https://www.wixapis.com/stores'}/v1/products/query`, {} , { headers: { authorization: access_token } });
    console.log(data);

    res.status(200).json({
        status: "success",
        data: data
    });
});

export const createProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    console.log(access_token);
    const {data} = await axios.post(`${'https://www.wixapis.com/stores'}/v1/products`, req.body , { headers: { authorization: access_token } });
    console.log(data);

    res.status(200).json({
        status: "success",
        data: data
    });
});


export const updateProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    console.log(access_token);
    const {data} = await axios.put(`${'https://www.wixapis.com/stores'}/v1/products/${req.params.id}`, req.body , { headers: { authorization: access_token } });
    console.log(data);

    res.status(200).json({
        status: "success",
        data: data
    });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    console.log(access_token);
    const {data} = await axios.delete(`${'https://www.wixapis.com/stores'}/v1/products/${req.params.id}`, { headers: { authorization: access_token } });
    console.log(data);

    res.status(200).json({
        status: "success",
        data: data
    });
});

export const getProduct = catchAsyncError(async (req, res, next) => {
    const { access_token } = await wixRefreshToken();
    console.log(access_token);
    const {data} = await axios.get(`${'https://www.wixapis.com/stores'}/v1/products/${req.params.id}`, { headers: { authorization: access_token } });
    console.log(data);

    res.status(200).json({
        status: "success",
        data: data
    });
});
