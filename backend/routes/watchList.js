const express = require('express')
const router = express.Router()
const watchListController = require('../controllers/watchList')
const { watch } = require('../models/WatchList')

router.get('/', watchListController.getWatchList)


router.post('/addticker/:id', watchListController.addTicker)
//here, in controller get the latest trade from alpaca




module.exports = router