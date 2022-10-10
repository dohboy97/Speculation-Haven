const mongoose = require('mongoose')
const { Schema } = mongoose;

const WatchListSchema = new Schema({
    ticker:String,
    price:Number,

})

module.exports = mongoose.model('WatchList',WatchListSchema)