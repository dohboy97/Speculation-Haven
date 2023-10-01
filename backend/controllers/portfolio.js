const Portfolio = require("../models/Portfolio")

module.exports = {
  getPortfolio: async (req, res) => {
    const userId = req.body.userId
    try {
      const portfolio = await Portfolio.findOne({ userId: userId })
      res.json({
        portfolio: portfolio,
      })
    } catch (err) {
      console.log(err)
    }
  },
  //SUBMIT INITIAL USER BALANCE
  addBalance: async (req, res) => {
    try {
      const portfolio = await Portfolio.create({
        balance: req.body.balance,
        deposits: req.body.deposits,
        withdrawals: req.body.withdrawals,
        userId: req.body.userId,
        performance: 0,
      })
      res.json({ portfolio: portfolio })
    } catch (err) {
      console.log(err)
    }
  },
  //USER WITHDRAWS OR DEPOSITS FUNDS
  editBalance: async (req, res) => {
    try {
      const portfolio = await Portfolio.findOneAndUpdate(
        {
          userId: req.body.userId,
        },
        {
          balance: req.body.balance,
          deposits: req.body.deposits,
          withdrawals: req.body.withdrawals,
        },
        { returnDocument: "after" }
      )
      res.json({ portfolio: portfolio })
    } catch (err) {
      console.log(err)
    }
  },

  //USER BUYS A TICKER; PUT REQ BECAUSE OWNED TICKER ARR WILL ALREADY EXIST ONCE BALANCE IS CREATED
  buyOrSellTicker: async (req, res) => {
    try {
      const portfolio = await Portfolio.findOneAndUpdate(
        {
          userId: req.body.userId,
        },
        {
          balance: req.body.updatedPortfolio.balance,
          ownedTickers: [...req.body.updatedPortfolio.ownedTickers],
          performance: req.body.performance,
        },
        { returnDocument: "after" }
      )
      res.json({ portfolio: portfolio })
    } catch (err) {
      console.log(err)
    }
  },
}
