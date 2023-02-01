import { useEffect, useState } from "react";

import NotFound from "./NotFound";
import { addToWatchList, buyTicker } from "../api";
import { Box, MenuItem, Select, TextField, Button } from "@mui/material";

function SearchedTicker({
  setTickerFound,
  selectedMarket,
  tickerInput,
  tickerFound,
  ticker,
  searchedTicker,
}) {
  const [selectedPurchaseMetric, setSelectedPurchaseMetric] =
    useState("Buy in $");
  const [isAddedToWatchList, setIsAddedToWatchlist] = useState();

  const [watchList, setWatchList] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState(0);

  //gets ticker upon button search
  async function buttonSearch() {
    setIsAddedToWatchlist(false);
    try {
      await post(tickerInput);
    } catch (err) {
      console.log(err);
    }
  }

  async function post(input) {
    const data = await addToWatchList({ input, watchList, selectedMarket });
    if (data.ticker === false) {
      setTickerFound(false);
    } else {
      setWatchList(data.stonks);
    }
  }

  //USEEFFECT

  useEffect(() => {
    setIsAddedToWatchlist(false);
    async function getWatchList() {
      const res = await fetch("/watchlist");
      const data = await res.json();
      //setState of watchlist here on page load

      if (watchList.length === 0 && data.stonks.length > 0) {
        setWatchList(data.stonks);
      }
    }
    getWatchList();

    watchList.forEach((el) => {
      if (el.symbol === searchedTicker.toUpperCase()) {
        setIsAddedToWatchlist(true);
      }
    });
  }, [
    purchaseAmount,
    selectedPurchaseMetric,
    watchList,
    isAddedToWatchList,
    searchedTicker,
    selectedMarket,
  ]);

  //BUY STOCK FOR PORTFOLIO
  const handlePurchase = buyTicker({
    tickerInput,
    ticker,
    selectedPurchaseMetric,
    purchaseAmount,
  });

  if (tickerFound === true) {
    const selectorText = ticker.type === "stock" ? "Buy Shares" : "Buy Coins";

    const purchaseInputPlaceHolder =
      selectedPurchaseMetric === "buy shares" ? "Quantity" : "Dollar Amount";

    const addToWatchListText = isAddedToWatchList
      ? "Already Added to Watchlist"
      : "Add to Watchlist";

    const displayTickerInfo =
      searchedTicker.toLowerCase() === tickerInput.toLowerCase();

    return (
      <Box>
        {displayTickerInfo && (
          <Box display="flex" flexDirection="column">
            <h2>Ticker:{searchedTicker}</h2>
            <span>Price:{ticker.stock.Price}</span>
            <Box sx={{ height: 50 }}>
              <Button
                variant="contained"
                onClick={buttonSearch}
                disabled={isAddedToWatchList}
              >
                {addToWatchListText}
              </Button>
            </Box>
            <Box display="flex" sx={{ minWidth: 800 }}>
              <TextField
                label={purchaseInputPlaceHolder}
                onChange={(e) => setPurchaseAmount(e.target.value)}
              />
              <Box>
                <Select
                  value={selectedPurchaseMetric}
                  onChange={(e) => setSelectedPurchaseMetric(e.target.value)}
                >
                  <MenuItem value={selectorText}>{selectorText}</MenuItem>
                  <MenuItem value={"Buy in $"}>Buy in $</MenuItem>
                </Select>
              </Box>
              <Button
                variant="contained"
                onClick={handlePurchase}
                disabled={purchaseAmount.length < 1}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  } else if (tickerFound === false) {
    return (
      <Box>
        <NotFound found={tickerFound} text={searchedTicker} />
      </Box>
    );
  }
}

export default SearchedTicker;
