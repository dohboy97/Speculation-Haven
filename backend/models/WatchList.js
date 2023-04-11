const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchListTickerSchema = new Schema({
  symbol: String,
  price: Number,
  type: String,
  index: Number,
});

const WatchListSchema = new Schema({
  userId: String,
  watchList: [WatchListTickerSchema],
});

module.exports = mongoose.model("WatchList", WatchListSchema);
