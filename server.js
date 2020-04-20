const app = require("./app");

const PORT = 3000 | process.env.PORT;

const HOSTNAME = "127.0.0.1";

app.listen(PORT, HOSTNAME, () => console.log("e-trust server connected"));