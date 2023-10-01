const mongoose = require("mongoose")
const { Schema } = mongoose

const OwnedTickerSchema = new Schema({
  symbol: String,
  price: Number,
  type: String,
  dollarAmount: Number,
  shares: Number,
})

const PortfolioSchema = new Schema({
  balance: Number,
  ownedTickers: [OwnedTickerSchema],
  deposits: Number,
  withdrawals: Number,
  userId: String,
  performance: Number,
})

module.exports = mongoose.model("Portfolio", PortfolioSchema)
