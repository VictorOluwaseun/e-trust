const Account = require("./../models/accounts");
const catchAsync = require("./../utils/catchAsync");

exports.createAccount = catchAsync(async (req, res) => {
  const {
    type,
    plan
  } = req.body;

  const newAccount = await Account.create({
    type,
    plan
  });
  res.status(200).json({
    status: "success",
    data: {
      newAccount
    }
  })
});