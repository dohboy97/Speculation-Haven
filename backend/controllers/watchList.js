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
        console.log(req.params.id)
        
        try{
            let trade = await alpaca.getLatestTrade(req.params.id);
            console.log(trade)
            await WatchList.create({
                symbol:req.params.id.toUpperCase(),
                price:trade.Price
                
            })
            const watchList = await WatchList.find()
            
            res.json({stonks:watchList,
            ticker:true})
             console.log('ticker added')
        }catch(err){
            console.log('test',err)
            res.json({ticker:false})
        }
    },
    deleteTicker: async (req,res)=>{
        console.log(req.params.id)
        await WatchList.findByIdAndDelete(req.params.id)
    },

    updateTicker: async(req,res)=>{
        console.log(req.params.id)
    }

}