const express = require("express");
const router = express.Router();
const watchListController = require("../controllers/watchList");

router.get("/:id", watchListController.getWatchList);

router.post("/addticker/:id", watchListController.addTicker);
//here, in controller get the latest trade from alpaca

router.delete("/deleteticker/:id", watchListController.deleteTicker);

router.put("/updatewatchlist", watchListController.updateWatchlist);

module.exports = router;
