const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')


router.post('/:id', searchController.getTicker)

module.exports = router