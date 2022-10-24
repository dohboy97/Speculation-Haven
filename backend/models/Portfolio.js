const mongoose = require('mongoose')
const { Schema } = mongoose;

const PortfolioSchema = new Schema({
    balance:Number,
    tickersOwned:Array,
    
})

module.exports = mongoose.model('Portfolio', PortfolioSchema)