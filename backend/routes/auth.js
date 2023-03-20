const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("/google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("test");
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
