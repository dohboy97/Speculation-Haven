const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.

    res.redirect("http://localhost:3001/watchlist");
  }
);
router.get("/status", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }
});

module.exports = router;
