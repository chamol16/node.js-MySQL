//rutas de login de usuarios
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../libs/auth");

//SIGNUP
router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

//SIGN IN
router.get("/signin", isNotLoggedIn, (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect("/signin");
});

module.exports = router;
