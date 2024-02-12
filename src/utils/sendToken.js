const sendToken = (statusCode, user, res) => {
  const token = user.getJwtToken();
  const option = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
    token,
  });
};
export default sendToken;
