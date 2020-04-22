const express = require("express");
const accountController = require("./../controllers/account");

const router = express.Router();

router
  .route("/")
  .post(accountController.createAccount);

module.exports = router;