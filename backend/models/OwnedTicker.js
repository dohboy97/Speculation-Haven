const mongoose = require('mongoose')
const { Schema } = mongoose;

const OwnedTickerSchema = new Schema({
    ticker:String,
    type:String,
    shares:String,
    balance:Number,
    
})

module.exports = mongoose.model('OwnedTicker',OwnedTickerSchema) 