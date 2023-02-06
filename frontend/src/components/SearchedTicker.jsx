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
import { round } from "lodash";
function SearchedTicker({
  setTickerFound,
  selectedMarket,
  tickerInput,
  tickerFound,
  ticker,
  searchedTicker,
}) {
  const [selectedPurchaseMetric, setSelectedPurchaseMetric] = useState();
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
      .then((res) => {
        if (watchList.length === 0 && res.stonks.length > 0) {
          setWatchList(res.stonks);
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
  }, [
    searchedTicker,
    watchList,
    setIsAddedToWatchlist,
    selectedPurchaseMetric,
    ticker,
  ]);

  useEffect(() => {
    selectedMarket === "stock"
      ? setSelectedPurchaseMetric("Buy Shares")
      : setSelectedPurchaseMetric("Buy Coins");
  }, [selectedMarket, setSelectedPurchaseMetric]);

  //BUY STOCK FOR PORTFOLIO
  const handlePurchase = () => {
    buyTicker({
      tickerInput,
      ticker,
      setSelectedPurchaseMetric,
      purchaseAmount,
    });
  };
  if (tickerFound === true) {
    const purchaseInputPlaceHolder =
      selectedPurchaseMetric === "Buy in $" ? "Dollar Amount" : "Quantity";

    const addToWatchListText = isAddedToWatchList
      ? "Added to Watchlist"
      : "Add to Watchlist";

    const displayTickerInfo =
      searchedTicker.toLowerCase() === tickerInput.toLowerCase() &&
      ticker.type === selectedMarket;

    const purchaseTotal =
      selectedPurchaseMetric === "Buy in $"
        ? purchaseAmount
        : Number(ticker.stock.Price) * purchaseAmount;

    const invalidPurchase = purchaseTotal < 1 || purchaseTotal > balance;

    const disabledPurchase = !purchaseAmount || invalidPurchase;

    const invalidFeedback =
      purchaseTotal < 1
        ? "Please enter a positive number"
        : `Purchase exceeds your balance by $${round(
            purchaseAmount - balance,
            2
          )}`;
    const isStock = selectedMarket === "stock";

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
                  {isStock && (
                    <MenuItem value={"Buy Shares"}>Buy Shares</MenuItem>
                  )}
                  {!isStock && (
                    <MenuItem value={"Buy Coins"}>Buy Coins</MenuItem>
                  )}
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
            {!!purchaseAmount && (
              <Typography marginTop={2} variant="subtitle">
                {invalidPurchase
                  ? invalidFeedback
                  : `Total: $${round(purchaseTotal, 2)}`}
              </Typography>
            )}
            {!purchaseAmount && (
              <Typography marginTop={2} variant="subtitle">
                Please enter a valid number if you wish to purchase
              </Typography>
            )}
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
