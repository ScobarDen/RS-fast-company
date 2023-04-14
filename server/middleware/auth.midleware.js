const tokenService = require("../services/token.service");
const chalk = require("chalk");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = tokenService.validateAccess(token);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = data;
    next();
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    res.status(401).json({ message: "Unauthorized" });
  }
};
