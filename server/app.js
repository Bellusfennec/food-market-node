const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

const PORT = config.get("port") ?? 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
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
