import passport from "passport";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./../middlewares/catchAsyncError.js";
import User from "./../models/userModel.js";
import crypto from "crypto";
import {
  forgetPasswordEmailMessage,
  verifyEmailMessage,
} from "../utils/emailMessage.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";

// google authentication call back function
export const googleAuth = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    try {
      if (err) {
        return next(new ErrorHandler(500, "Internal Server Error"));
      }
      if (!user) {
        return next(new ErrorHandler(401, "User Not Found"));
      }
      // storing token in the cache
      sendToken(201, user, res);
    } catch (error) {
      return next(new ErrorHandler(500, err.message));
    }
  })(req, res, next);
};

// controllers for local auth

// controller of signup

// catchAsyncError --- custom try catch block handler/middleware
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    // custom class for error handel
    return next(new ErrorHandler(401, "User already exist"));
  }
  user = await User.create({ name, email, password });
  if (!user) {
    return next(new ErrorHandler(401, "User not created"));
  }
  sendToken(201, user, res);
});

// controller that will send email to use which have link to verify the email
export const verifyEmailRequest = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const restToken = await user.getToken();
  await user.save({ validateBeforeSave: false });
  const verifyUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/verify/email/${restToken}`;
  try {
    // generic function for sending mails
    await sendEmail({
      email: user.email,
      subject: "Email Verify",
      html: verifyEmailMessage(verifyUrl),
    });
    res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    user.token = undefined;
    user.tokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// controller to verify the user email
export const verifyEmail = catchAsyncError(async (req, res, next) => {
  const verifiedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    token: verifiedToken,
    tokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        400,
        "reset password token is invalid or has been expired"
      )
    );
  }
  user.token = undefined;
  user.tokenExpire = undefined;
  user.verified = true;
  await user.save();
  /**
   * put here code to redirect the user on landing page
   * must add the code before build
   */
  sendToken(201, user, res);
});

// controller for local login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }
  sendToken(201, user, res);
});

// controller to logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfully",
    });
});
// controller to get details of the loggedIn user
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// controller send email if user forget the password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(404, "user not found"));
  }
  const restToken = await user.getToken();
  await user.save({ validateBeforeSave: false });
  /**
   * send the url of frontend page of forget password form with token
   * must add the code before build
   */
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${restToken}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "password recovery",
      html: forgetPasswordEmailMessage(resetPasswordUrl),
    });
    res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    user.token = undefined;
    user.tokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// controller to reset the password after requesting forget password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const verifiedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    token: verifiedToken,
    tokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        400,
        "reset password token is invalid or has been expired"
      )
    );
  }
  user.password = req.body.password;
  user.restPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(201, user, res);
});
