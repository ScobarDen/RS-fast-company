const express = require("express");
const chalk = require("chalk");
const Profession = require("../models/Profession");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const professions = await Profession.find();
    res.status(200).send(professions);
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
    });
  }
});

module.exports = router;
