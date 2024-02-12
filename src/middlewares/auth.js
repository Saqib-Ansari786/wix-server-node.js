import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

// middleware to check user is loggedIn or not 
export const isAuthenticate = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(401, "please login to access"));
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  next();
});


// middleware to check if the user email is verified or not
export const isVerified = catchAsyncError(async (req, res, next) => {    
  if (!req.user.verified) {
    return next(new ErrorHandler(401, "please Verified your Email"));
  }
  next();
});


// middle ware to access only for authorizedRoles only
/**
 * use --- authorized("admin" , "user") -- you can add only on authorized role or many authorized role
 */
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(403, `role:${req.user.role} is not allowed to access`)
      );
    }
    next();
  };
};
