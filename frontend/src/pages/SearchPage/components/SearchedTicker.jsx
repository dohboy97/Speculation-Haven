import { useEffect, useState } from "react";
import NotFound from "../../../components/NotFound";
import {
  addToWatchList,
  editPortfolio,
  getPortfolio,
  getWatchList,
} from "../../../api";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { round } from "lodash";
import { calculateOrder } from "../../../utils";
import { toast } from "react-toastify";
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
  const [buyOrSell, setBuyOrSell] = useState(0);
  const [watchList, setWatchList] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [portfolio, setPortfolio] = useState(0);
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
      toast.success("Added to Watchlist");
    }
  };

  useEffect(() => {
    setIsAddedToWatchlist(false);

    getWatchList()
      .then((res) => {
        setWatchList(res.stonks);
      })
      .catch((err) => console.error(err));
    watchList.forEach((el) => {
      if (el.symbol === searchedTicker.toUpperCase()) {
        setIsAddedToWatchlist(true);
      }
    });
    getPortfolio()
      .then((res) => setPortfolio(res.portfolio[0]))
      .catch((err) => console.error(err));
  }, [
    searchedTicker,
    watchList,
    setIsAddedToWatchlist,
    selectedPurchaseMetric,
    ticker,
  ]);
  //Set purchase metric on market change
  useEffect(() => {
    selectedMarket === "stock"
      ? setSelectedPurchaseMetric("Buy Shares")
      : setSelectedPurchaseMetric("Buy Coins");
  }, [selectedMarket, setSelectedPurchaseMetric]);

  //BUY STOCK FOR PORTFOLIO
  const handlePurchase = () => {
    const order = {
      tickerInput: tickerInput,
      ticker: ticker,
      selectedPurchaseMetric: selectedPurchaseMetric,
      purchaseAmount: purchaseAmount,
    };

    const updatedPortfolio = calculateOrder({
      currentPortfolio: portfolio,
      order: order,
    });
    editPortfolio({
      updatedPortfolio,
    })
      .then((res) => {
        console.log(res);
        setPortfolio(res.portfolio[0]);
      })
      .catch((err) => console.error(err))
      .finally(() => toast.success("Purchase Successful"));
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

    const invalidPurchase =
      purchaseTotal < 1 || purchaseTotal > portfolio.balance;

    const disabledPurchase = !purchaseAmount || invalidPurchase;

    const invalidFeedback =
      purchaseTotal < 1
        ? "Please enter a positive number"
        : `Purchase exceeds your balance by $${round(
            purchaseTotal - portfolio.balance,
            2
          )}`;
    const isStock = selectedMarket === "stock";

    return (
      <Box>
        {displayTickerInfo && (
          <Box display="flex" flexDirection="column">
            <Typography marginY={2} variant="h6">
              {searchedTicker}
            </Typography>
            <Typography marginBottom={2} variant="subtitle1">
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
            <Tabs value={buyOrSell} onChange={(e, val) => setBuyOrSell(val)}>
              <Tab label="Buy" id={0}></Tab>
              <Tab label="Sell" id={1}></Tab>
            </Tabs>
            <Box marginY={2} display="flex" sx={{ minWidth: 800 }}>
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
