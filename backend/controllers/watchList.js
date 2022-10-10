const WatchList = require('../models/WatchList')

module.exports = {
    // getWatchList: async(req,res)=>{
    //     try{
    //         const watchList = await WatchList.find()
    //         console.log(res)
    //     }catch(err){
    //         console.log(err)
    //     }
    // },

    addTicker: async(req,res)=>{
        console.log(req.body)
        try{
            await WatchList.create({
                ticker:req.body.ticker,
                price:req.body.price,
                
            })
            res.redirect('/')
            console.log('ticker added')
        }catch(err){
            console.log(err)
        }
    }
}