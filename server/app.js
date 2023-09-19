const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const { ip } = require("./utils/networkIp");

console.log(ip);

const PORT = config.get("port") ?? 8080;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
  console.log("NODE_ENV: ", chalk.blue("Production"));
} else {
  console.log("NODE_ENV: ", chalk.redBright("Development"));
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`Mongo DB connected.`));
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on PORT ${PORT}...`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
