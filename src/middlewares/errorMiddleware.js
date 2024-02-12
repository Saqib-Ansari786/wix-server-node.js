import ErrorHandler from "../utils/errorHandler.js";

// calling this middleware always in the end of the app 
const errorMiddleware = (err, req, res, next) => {
  // handle almost every type of error
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(400, message);
  }
  switch (err.name) {
    case "CastError":
      const castErrorMessage = `resource not found. invalid ${err.path}`;
      err = new ErrorHandler(400, castErrorMessage);
      break;
    case "JsonWebTokenError":
      const jwtErrorMessage = `Json web token is invalid`;
      err = new ErrorHandler(400, jwtErrorMessage);
      break;
    case "TokenExpireError":
      const tokenExpireErrorMessage = `Json web token is expired`;
      err = new ErrorHandler(400, tokenExpireErrorMessage);
      break;
    default:
      break;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
