// custom try catch block handler -- not applicable on every try catch block 
const catchAsyncError = (asyncFunction) => (req, res, next) => {
  Promise.resolve(asyncFunction(req, res, next)).catch(next);
};

export default catchAsyncError;
