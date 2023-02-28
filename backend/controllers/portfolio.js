const Portfolio = require("../models/Portfolio");

module.exports = {
  getPortfolio: async (req, res) => {
    try {
      const portfolio = await Portfolio.find();
      res.json({
        portfolio: portfolio,
      });
    } catch (err) {
      console.log(err);
    }
  },
  //SUBMIT INITIAL USER BALANCE
  addBalance: async (req, res) => {
    try {
      await Portfolio.create({
        balance: req.body.balance,
        deposits: req.body.deposits,
        withdrawals: req.body.withdrawals,
      });
      const portfolio = await Portfolio.find();
      res.json({ portfolio: portfolio });
    } catch (err) {
      console.log(err);
    }
  },
  //USER WITHDRAWS OR DEPOSITS FUNDS
  editBalance: async (req, res) => {
    try {
      await Portfolio.findOneAndUpdate({
        balance: req.body.balance,
        deposits: req.body.deposits,
        withdrawals: req.body.withdrawals,
      });
      const portfolio = await Portfolio.find();
      res.json({ portfolio: portfolio });
    } catch (err) {
      console.log(err);
    }
  },
  //USER BUYS A TICKER; PUT REQ BECAUSE OWNED TICKER ARR WILL ALREADY EXIST ONCE BALANCE IS CREATED
  buyOrSellTicker: async (req, res) => {
    try {
      await Portfolio.findOneAndUpdate({
        balance: req.body.updatedPortfolio.balance,
        ownedTickers: [...req.body.updatedPortfolio.ownedTickers],
      });
      const portfolio = await Portfolio.find();
      res.json({ portfolio: portfolio });
    } catch (err) {
      console.log(err);
    }
  },
};
