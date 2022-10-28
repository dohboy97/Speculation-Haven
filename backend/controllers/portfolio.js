const Portfolio = require('../models/Portfolio')


module.exports = {
    getPortfolio: async(req,res)=>{
        console.log('hello')
        try{
            const portfolio = await Portfolio.find()
            res.json({
                portfolio:portfolio
            })
        }catch(err){
            console.log(err)
        }
    },

    addBalance: async(req,res)=>{
        try{
            await Portfolio.create({
                balance:req.body.balance,
                ownedTickers:req.body.ownedTickers
            })
            const portfolio = await Portfolio.find()
            res.json({portfolio:portfolio})
        }catch(err){
            console.log(err)
        }
    }
}