const mongoose = require("mongoose");
const esusu = require("./../utils/data/esusu");
const weekly = require("./../utils/data/weekly");
const monthly = require("./../utils/data/monthly");

const accountSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "There must be an account type"],
    trim: true,
    enum: {
      values: ["Esusu", "Weekly", "Monthly"],
      message: "Account is either: Esusu, Weekly, Monthly"
    }
  },
  plan: {
    type: String,
    required: [true, "There must be an account type"],
    trim: true,
    enum: {
      values: ["Starter", "Normal", "Standard", "Advance"],
      message: "Account is either: Starter, Normal, Standard, Advance"
    },
  },
  accountName: String,
  accountNumber: Number,
  slug: String,
  amount: {
    type: Number
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    select: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A user must own an account"]
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});


accountSchema.pre("save", function (next) {
  switch (this.type) {
    case "Esusu":
      for (let i = 0; i < esusu.length; i++) {
        if (this.plan === esusu[i].name) {
          this.amount = esusu[i].amount;
          this.description = esusu[i].description;
          break;
        }
      }
      break;

    case "Weekly":
      for (let i = 0; i < weekly.length; i++) {
        if (this.plan === weekly[i].name) {
          this.amount = weekly[i].amount;
          this.description = weekly[i].description;
          break;
        }
      }
      break;
    case "Monthly":
      for (let i = 0; i < monthly.length; i++) {
        if (this.plan === monthly[i].name) {
          this.amount = monthly[i].amount;
          this.description = monthly[i].description;
          break;
        }
      }
      break;
    default:
      break;
  }

  this.slug = slugify(this.type, {
    lower: true
  });
  next();
});

// accountSchema.pre("save", function (next) {

//   next();
// })

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;