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
        console.log('hi')
        try{
          let currentPort = await Portfolio.find()
            
          
            await Portfolio.findOneAndUpdate({
               ownedTickers:[...currentPort[0].ownedTickers,{
                symbol:'AAPL',
                price:168,
                type:'stock',
                dollarAmount:1000,
                shares:9
               }]
                
            })
            const portfolio = await Portfolio.find()
            res.json({portfolio:portfolio})
        }catch(err){
            console.log(err)
        }
    }
}