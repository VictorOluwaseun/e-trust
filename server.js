const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env"
});

const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.info("etrust database connection successful"));

const PORT = process.env.PORT;

const HOSTNAME = "127.0.0.1";
app.listen(PORT, HOSTNAME, () => console.log("e-trust server connected"));