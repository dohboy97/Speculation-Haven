import { useEffect, useState } from "react";

import NotFound from "./NotFound";
import { addToWatchList, buyTicker, getPortfolio, getWatchList } from "../api";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
} from "@mui/material";

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
  const [balance, setBalance] = useState(0);

  //gets ticker upon button search

  const handleAddToWatchlist = async () => {
    const data = await addToWatchList({
      tickerInput,
      watchList,
      selectedMarket,
    });
    if (data.ticker === false) {
      setTickerFound(false);
    } else {
      setWatchList(data.stonks);
    }
  };

  //USEEFFECT

  useEffect(() => {
    setIsAddedToWatchlist(false);
    getWatchList()
      .then((watchList) => {
        if (watchList.length === 0 && watchList.stonks.length > 0) {
          setWatchList(watchList.stonks);
        }
      })
      .catch((err) => console.error(err));

    watchList.forEach((el) => {
      if (el.symbol === searchedTicker.toUpperCase()) {
        setIsAddedToWatchlist(true);
      }
    });
    getPortfolio()
      .then((res) => setBalance(res.portfolio[0].balance))
      .catch((err) => console.error(err));
  }, [searchedTicker, watchList, setIsAddedToWatchlist]);

  //BUY STOCK FOR PORTFOLIO
  const handlePurchase = () => {
    buyTicker({
      tickerInput,
      ticker,
      selectedPurchaseMetric,
      purchaseAmount,
    });
  };

  if (tickerFound === true) {
    const selectorText = ticker.type === "stock" ? "Buy Shares" : "Buy Coins";

    const purchaseInputPlaceHolder =
      selectedPurchaseMetric === "buy shares" ? "Quantity" : "Dollar Amount";

    const addToWatchListText = isAddedToWatchList
      ? "Already Added to Watchlist"
      : "Add to Watchlist";

    const displayTickerInfo =
      searchedTicker.toLowerCase() === tickerInput.toLowerCase() &&
      ticker.type === selectedMarket;

    const invalidPurchase = purchaseAmount < 1 || purchaseAmount > balance;

    const disabledPurchase = !purchaseAmount || invalidPurchase;

    return (
      <Box>
        {displayTickerInfo && (
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">{searchedTicker}</Typography>
            <Typography variant="subtitle1">
              Price:{ticker.stock.Price}
            </Typography>
            <Box sx={{ height: 50 }}>
              <Button
                variant="contained"
                onClick={handleAddToWatchlist}
                disabled={isAddedToWatchList}
              >
                {addToWatchListText}
              </Button>
            </Box>
            <Box display="flex" sx={{ minWidth: 800 }}>
              <TextField
                label={purchaseInputPlaceHolder}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
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
                disabled={disabledPurchase}
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
