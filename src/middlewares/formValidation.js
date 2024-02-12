import {
  joiForgetPasswordSchema,
  joiLoginSchema,
  joiResetPasswordSchema,
  joiSignupSchema,
} from "../utils/joiSchema.js";
import validationResponse from "../utils/validationResponse.js";

/**
 * form validation middleware
 * using joi schema
 */

//register form validation
export const registerValidation = (req, res, next) => {
  const { error } = joiSignupSchema.validate(req.body);
  validationResponse(error, next);
};

// login form validation
export const loginValidation = (req, res, next) => {
  const { error } = joiLoginSchema.validate(req.body);
  validationResponse(error, next);
};

// forget password form validation
export const forgetPasswordEmailValidation = (req, res, next) => {
  const { error } = joiForgetPasswordSchema.validate(req.body);
  validationResponse(error, next);
};

// reset password form validation
export const resetPasswordValidation = (req, res, next) => {
  const { error } = joiResetPasswordSchema.validate(req.body);
  validationResponse(error, next);
};
