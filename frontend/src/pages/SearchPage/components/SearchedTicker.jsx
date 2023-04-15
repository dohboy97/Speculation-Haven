import { useEffect, useState } from "react";
import NotFound from "../../../components/NotFound";
import { addToWatchList, getPortfolio, getWatchList } from "../../../api";
import { Box, Button, Typography, Tabs, Tab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import BuyTicker from "./BuyTicker";
import SellTicker from "./SellTicker";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context";
function SearchedTicker({
  setTickerFound,
  selectedMarket,
  tickerInput,
  tickerFound,
  ticker,
  searchedTicker,
}) {
  const user = useContext(UserContext);

  const userId = user._id;
  const [buyOrSell, setBuyOrSell] = useState(0);
  const [watchList, setWatchList] = useState([]);

  const [portfolio, setPortfolio] = useState(0);
  const navigate = useNavigate();
  //gets ticker upon button search
  const handleAddToWatchlist = async () => {
    const data = await addToWatchList({
      tickerInput,
      watchList,
      selectedMarket,
      userId,
    });
    if (data.ticker === false) {
      setTickerFound(false);
    } else {
      setWatchList(data.stonks);
      toast.success("Added to Watchlist");
    }
  };

  useEffect(() => {
    getWatchList({ userId })
      .then((res) => {
        setWatchList(res.stonks.watchList);
      })
      .catch((err) => console.error(err));

    getPortfolio()
      .then((res) => setPortfolio(res.portfolio[0]))
      .catch((err) => console.error(err));
  }, [searchedTicker, ticker, userId]);

  const isAddedToWatchList = !!watchList.find(
    (el) => el.symbol === searchedTicker.toUpperCase()
  );

  //Set purchase metric on market change
  if (tickerFound === true) {
    const addToWatchListText = isAddedToWatchList
      ? "Added to Watchlist"
      : "Add to Watchlist";

    return (
      <Box>
        <ArrowBackIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />

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
          <Box>
            {buyOrSell === 0 && (
              <BuyTicker
                selectedMarket={selectedMarket}
                tickerInput={tickerInput}
                ticker={ticker}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
              />
            )}
          </Box>
          {buyOrSell === 1 && (
            <SellTicker
              selectedMarket={selectedMarket}
              tickerInput={tickerInput}
              ticker={ticker}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          )}
        </Box>
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
