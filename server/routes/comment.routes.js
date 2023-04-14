const express = require("express");
const chalk = require("chalk");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
    });
  }
});

router.patch("/:userId", async (req, res) => {
  try {
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
    });
  }
});

module.exports = router;
