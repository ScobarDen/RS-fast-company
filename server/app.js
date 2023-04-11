const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const PORT = config.get("port") ?? 8080;

const app = express();

process.env.NODE_ENV === "production" &&
  console.log(chalk.blue("Production environment"));
process.env.NODE_ENV === "development" &&
  console.log(chalk.blue("Development environment"));

app.listen(PORT, () =>
  console.log(chalk.green(`Server has been started on port ${PORT}...`))
);
