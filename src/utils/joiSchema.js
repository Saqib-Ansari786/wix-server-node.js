import Joi from "joi";

export const joiSignupSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(4)
    .max(255)
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref("password"),
  email: Joi.string().email().required(),
});

export const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const joiForgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const joiResetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref("password"),
});
