const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const connectDB = require("./config/database");
const MongoStore = require("connect-mongo");
require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport google oauth2.0

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "localhost:3000",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

//routes

const watchListRoute = require("./routes/watchList");
const searchRoute = require("./routes/search");
const portfolioRoute = require("./routes/portfolio");

const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../", "frontend", "src", "index.js"))
);

app.use("/watchlist", watchListRoute);
app.use("/search", searchRoute);
app.use("/portfolio", portfolioRoute);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
