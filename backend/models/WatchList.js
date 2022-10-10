const mongoose = require('mongoose')
const { Schema } = mongoose;

const WatchListSchema = new Schema({
    ticker:String,
    price:String,
    
})

module.exports = mongoose.model('WatchList',WatchListSchema)