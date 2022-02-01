const express = require("express");
const router = express.Router();
const { isNotLoggedIn } = require("../libs/auth");

router.get("/", isNotLoggedIn, (req, res) => {
  res.render("index");
});

module.exports = router;
