const Alpaca = require("@alpacahq/alpaca-trade-api");

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.API_SECRET,
  paper: true,
});

module.exports = {
  getTicker: async (req, res) => {
    try {
      let trade;

      if (req.body.type === "stock") {
        trade = await alpaca.getLatestTrade(req.params.id);
      } else {
        trade = await alpaca.getLatestCryptoTrade(`${req.params.id}USD`, {
          exchange: "FTXU",
        });
      }
      res.json({ stock: trade, type: req.body.type });
    } catch (err) {
      console.log(err);
      res.json("error");
    }
  },
};
