const Portfolio = require('../models/Portfolio')


module.exports = {
    getPortfolio: async(req,res)=>{
      
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
                
            })
            const portfolio = await Portfolio.find()
            res.json({portfolio:portfolio})
        }catch(err){
            console.log(err)
        }
    },
    editBalance:async(req,res)=>{
        try{
            await Portfolio.findOneAndUpdate({
                balance:req.body.balance,
                
            })
            const portfolio = await Portfolio.find()
            res.json({portfolio:portfolio})
        }catch(err){
            console.log(err)
        }
    }
}