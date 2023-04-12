const express = require("express");
const User = require("../models/User");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const expressValidator = require("express-validator");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");

const router = express.Router({ mergeParams: true });

// /api/auth/signUp
router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: "EMAIL_EXIST",
          code: 400,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashPassword,
    });
    const tokens = tokenService.generate({ _id: newUser._id });
    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
    });
  }
});
router.post("/signInWithPassword", async (req, res) => {});
router.post("/token", async (req, res) => {});

module.exports = router;
