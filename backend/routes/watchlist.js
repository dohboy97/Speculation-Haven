const express = require('express')
const router = express.Router()
const watchListController = require('../controllers/watchList')

router.get('/',  watchListController.getDream)


router.post('/addTicker', watchListController.addTicker)

router.delete('/deleteTicker', watchListController.deleteTicker)



module.exports = router