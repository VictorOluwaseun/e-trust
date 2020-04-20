const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your First Name"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Please provide your Last Name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  photo: {
    type: String,
    default: "default.jpg"
  },
  nationality: {
    type: String,
    trim: true,
    enum: ["National ID", "Internaitonal Passport", "Driving License", "Voters' Card"]
  },
  state: {
    type: String,
    trim: true
  },
  lga: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  bvn: {
    type: Number,
    trim: true,
    minlength: 11,
    maxlength: 11
  },
  wallet: {
    type: Number,
    default: 0
  },
  accountNumber: {
    type: Number,
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  noOfAccounts: {
    type: Number,
    default: 0
  },
  totalContributions: {
    type: Number,
    default: 0,
    select: false,
  },
  asGuarantor: {
    type: Boolean,
    default: false,
    select: false
  },
  loanEligibility: {
    type: Boolean,
    default: false,
    select: false
  },
  loanLimit: {
    type: Number,
    default: 0
  },
  loanBalance: {
    type: Number,
    select: false
  },
  owing: {
    type: Boolean,
    default: false
  },
  noOfLoans: 0,
  updateProfile: {
    type: Boolean,
    default: false,
    select: false
  },
  referrer: {
    type: mongoose.Schema.ObjectId,
    ref: "Referrer"
  },
  referrerLink: {
    type: String,
    unique: true
  },
  review: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  reviewCreatedAt: Date,
  timestamp: {
    type: Date,
    default: Date.now(),
    select: false
  },
  role: {
    type: String,
    enum: ["user", "accountant", "manager", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;