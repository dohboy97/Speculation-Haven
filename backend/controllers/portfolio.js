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
    //SUBMIT INITIAL USER BALANCE
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
    //USER WITHDRAWS OR DEPOSITS FUNDS
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
    },
    //USER BUYS A TICKER; PUT REQ BECAUSE OWNED TICKER ARR WILL ALREADY EXIST ONCE BALANCE IS CREATED
    buyOrSellTicker:async(req,res)=>{
       
        try{
          let currentPort = await Portfolio.find()
            
          console.log(req.body)
            // await Portfolio.findOneAndUpdate({
            //    ownedTickers:[...currentPort[0].ownedTickers,{
            //     symbol:req.body.symbol,
            //     price:req.body.price,
            //     type:req.body.type,
            //     dollarAmount:req.body.dollarAmount,
            //     shares:req.body.shares
            //    }]
                
            // })
            const portfolio = await Portfolio.find()
            res.json({portfolio:portfolio})
        }catch(err){
            console.log(err)
        }
    }
}