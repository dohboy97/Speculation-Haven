const WatchList = require('../models/WatchList')
const Alpaca = require("@alpacahq/alpaca-trade-api");

//alpaca class and key info

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.API_SECRET,
  paper: true,
});




module.exports = {
    getWatchList: async(req,res)=>{
        try{
            const watchList = await WatchList.find()
            res.json({stonks:watchList})
        }catch(err){
            console.log(err)
        }
    },

    addTicker: async(req,res)=>{
        console.log(req.body,req.body.symbol)
        async function getPrice(){
            const trade = await alpaca.getLatestTrade('AAPL');
            console.log(trade);
            }
            getPrice()
        try{
            await WatchList.create({
                symbol:req.body.symbol,
                close:req.body.close,
                
            })
            res.redirect('/')
             console.log('ticker added')
        }catch(err){
            console.log(err)
        }
    }
}