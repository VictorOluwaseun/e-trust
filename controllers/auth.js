const User = require("./../models/users");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
});