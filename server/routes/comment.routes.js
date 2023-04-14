const express = require("express");
const chalk = require("chalk");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.midleware");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (err) {
      console.log(chalk.red(`Error: ${err.message}`));
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже...",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (err) {
      console.log(chalk.red(`Error: ${err.message}`));
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже...",
      });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);
    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
    });
  }
});

module.exports = router;
