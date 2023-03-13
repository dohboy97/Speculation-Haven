const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/database");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: "./config/.env" });

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
