const AppError = require("./../utils/AppError");

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
}

const sendErrorDev = (err, req, res) => {
  //For an API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  //For rendered website if need be
};

const sendErrorProd = (err, req, res) => {
  //For an API
  if (req.originalUrl.startsWith("/api")) {
    //Operation, trusted error: Send message to Client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // For programming error or unknown error: error details shouldn't be leaked
    //Log error
    console.log("ERROR 💥 ⚠", err);
    //2. Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!"
    });
  }
  //For a rendered website
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);

  } else if (process.env.NODE_ENV === "production") {
    let error = {
      ...err
    };
    error.message = err.message //Error message got escaped

    if (error.name === "ValidationError") error = handleValidationErrorDB(error);

    sendErrorProd(error, req, res);
  }
};