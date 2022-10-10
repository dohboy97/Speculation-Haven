const WatchList = require('../models/WatchList')

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
        //issue with not posting to db is that its an array, need to specify index or change watchlist in react to only send over one ticker
        try{
            await WatchList.create({
                ticker:req.body.symbol,
                price:req.body.close,
                
            })
            res.redirect('/')
            console.log('ticker added')
        }catch(err){
            console.log(err)
        }
    }
}