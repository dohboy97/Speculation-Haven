const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')

router.get('/:id', searchController.getTicker,)

module.exports = router