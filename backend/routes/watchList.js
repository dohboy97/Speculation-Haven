const express = require('express')
const router = express.Router()
const watchListController = require('../controllers/watchList')

router.get('/', watchListController.getWatchList)


router.post('/addticker', watchListController.addTicker)





module.exports = router