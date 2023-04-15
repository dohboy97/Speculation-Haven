const WatchList = require("../models/WatchList");
const Alpaca = require("@alpacahq/alpaca-trade-api");

//alpaca class and key info

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.API_SECRET,
  paper: true,
});

module.exports = {
  getWatchList: async (req, res) => {
    try {
      const userId = req.params.id;
      const watchList = await WatchList.findOne({ userId });

      res.json({ stonks: watchList });
    } catch (err) {
      console.log(err);
    }
  },

  addTicker: async (req, res) => {
    try {
      let trade;
      if (req.body.type === "stock") {
        trade = await alpaca.getLatestTrade(req.params.id);
      } else {
        trade = await alpaca.getLatestCryptoTrade(`${req.params.id}USD`, {
          exchange: "FTXU",
        });
      }
      console.log(req.body);
      await WatchList.create({
        userId: req.body.userId,
        watchList: {
          symbol: req.params.id.toUpperCase(),
          price: trade.Price,
          type: req.body.type,
          index: req.body.index,
        },
      });
      const watchList = await WatchList.find({ userId: req.userId });

      res.json({ stonks: watchList, ticker: true });
    } catch (err) {
      res.json({ ticker: false });
    }
  },
  deleteTicker: async (req, res) => {
    await WatchList.findByIdAndDelete(req.params.id);
  },

  updateTicker: async (req, res) => {
    try {
      let trade;
      if (req.body.type === "stock") {
        trade = await alpaca.getLatestTrade(req.body.symbol);
      } else {
        trade = await alpaca.getLatestCryptoTrade(`${req.body.symbol}USD`, {
          exchange: "FTXU",
        });
      }
      await WatchList.findByIdAndUpdate(
        { _id: req.params.id },
        {
          price: trade.Price,
        }
      );
      const updatedTicker = await WatchList.find({ _id: req.params.id });

      res.json({ updatedStonk: updatedTicker });
    } catch (err) {
      console.log(err);
    }
  },
};
