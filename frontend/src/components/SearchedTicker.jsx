import { useEffect, useState } from "react";

import NotFound from "./NotFound";

import { Box, MenuItem, Select, TextField, Button } from "@mui/material";

function SearchedTicker({
  setTickerFound,
  selectedMarket,
  detectInput,
  tickerInput,
  tickerFound,
  ticker,
}) {
  const [selectedPurchaseMetric, setSelectedPurchaseMetric] =
    useState("Buy in $");
  const [addToWatchListButton, setAddToWatchListButton] =
    useState("Add to Watchlist");

  const [watchList, setWatchList] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState(0);

  //gets ticker upon button search
  async function buttonSearch() {
    try {
      await getTicker();
    } catch (err) {
      console.log(err);
    }
  }

  async function post(input) {
    let alreadyExists = false;
    watchList.forEach((el) => {
      if (el.symbol === input) {
        alreadyExists = true;
      }
    });

    //only fetch new ticker if input doesnt exist in object

    if (alreadyExists === false) {
      setTickerFound(true);
      const res = await fetch(`/watchlist/addticker/${input}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          type: selectedMarket,
          index: watchList.length,
        }),
      });
      const data = await res.json();
      if (data.ticker === false) {
        setTickerFound(false);
      } else {
        setWatchList(data.stonks);
      }
    }
  }

  //grabs ticker input for fetch
  async function getTicker() {
    let input = document.querySelector(".search").value.toUpperCase();
    detectInput(input);

    post(input);
  }

  //USEEFFECT

  useEffect(() => {
    setAddToWatchListButton("Add to Watchlist");
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
      if (el.symbol === tickerInput && el.type === selectedMarket) {
        setAddToWatchListButton("Already Added to Watchlist");
      }
    });
  }, [
    purchaseAmount,
    selectedPurchaseMetric,
    watchList,
    addToWatchListButton,
    tickerInput,
    selectedMarket,
  ]);

  //BUY STOCK FOR PORTFOLIO
  async function buyTicker() {
    const symbol = tickerInput;
    const price = Number(ticker.stock.Price);
    const type = ticker.type;
    const dollarAmount =
      selectedPurchaseMetric === "buy in $"
        ? purchaseAmount
        : purchaseAmount * price;
    const shares =
      selectedPurchaseMetric === "buy shares"
        ? purchaseAmount
        : purchaseAmount / price;
    const res = await fetch(`/portfolio/buyOrSellTicker`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        type,
        symbol,
        dollarAmount,
        shares,
        price,
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  if (tickerFound === true) {
    const selectorText = ticker.type === "stock" ? "Buy Shares" : "Buy Coins";
    const purchaseInputPlaceHolder =
      selectedPurchaseMetric === "buy shares" ? "Quantity" : "Dollar Amount";
    return (
      <Box display="flex" flexDirection="column">
        <h2>Ticker: {tickerInput}</h2>
        <span>Price:{ticker.stock.Price}</span>
        <Box sx={{ height: 50 }}>
          <Button variant="contained" onClick={buttonSearch}>
            {addToWatchListButton}
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
            onClick={buyTicker}
            disabled={purchaseAmount.length < 1}
          >
            Submit
          </Button>
        </Box>
      </Box>
    );
  } else if (tickerFound === false) {
    return (
      <Box>
        <NotFound found={tickerFound} text={tickerInput} />
      </Box>
    );
  }
}

export default SearchedTicker;
