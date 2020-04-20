const express = require("express");
const morgan = require("morgan");


const accountRouter = require("./routes/accounts");
const userRouter = require("./routes/users");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/error");

const app = express();

//Middlewares

// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//To allow json 
app.use(express.json({
  limit: "10kb"
}));

//To allow form data
app.use(express.urlencoded({
  extended: true,
  limit: "10kb"
}));

app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/loans", loanRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;