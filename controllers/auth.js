const jwt = require("jsonwebtoken");
const User = require("./../models/users");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const Email = require("../utils/Email");


const signToken = id => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000),
    httpOnly: true
  }
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  //Remove the password
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  //Email
  const url = `${req.protocol}:/${req.get("host")}/me`;
  await new Email(newUser, url, "Update your profile.").sendWelcome();
  createSendToken(newUser, 201, res);
});