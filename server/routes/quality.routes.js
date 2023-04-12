const express = require("express");
const Quality = require("../models/Qualitie");
const chalk = require("chalk");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const qualities = await Quality.find();
    res.status(200).send(qualities);
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
    });
  }
});

module.exports = router;
