const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolio')


router.get('/',portfolioController.getPortfolio)
router.post('/addbalance',portfolioController.addBalance)
router.put('/editbalance',portfolioController.editBalance)

module.exports = router 