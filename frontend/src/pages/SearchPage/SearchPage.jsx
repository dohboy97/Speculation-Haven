import { useState } from "react";
import SearchedTicker from "./components/SearchedTicker";
import { getTickerFromServer } from "../../api";

import { Box, Typography } from "@mui/material";
import { TickerInput } from "./components/TickerInput";
import {
  createSearchParams,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";
function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //detect and use search input to then take to server api and retrieve ticker info
  const [tickerFound, setTickerFound] = useState();
  const [tickerInput, setTickerInput] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("stock");
  const [ticker, setTicker] = useState();
  const [searchedTicker, setSearchedTicker] = useState("");
  //grabs ticker input for fetch
  async function getTickerInfo() {
    searchParams.set("symbol", tickerInput);
    searchParams.set("market", selectedMarket);
    navigate({
      pathname: "ticker",
      search: `${createSearchParams(searchParams)}`,
    });
  }

  useEffect(() => {
    setTickerFound();

    const tickerSearched = searchParams.get("symbol");
    const market = searchParams.get("market");
    if (!tickerSearched || !market) return;

    getTickerFromServer({
      input: tickerSearched,
      selectedMarket: market,
    }).then((data) => {
      data === "error" ? setTickerFound(false) : setTickerFound(true);
      setTicker(data);
    });
    setSearchedTicker(tickerSearched.toUpperCase());
    setTickerInput(tickerSearched);
  }, [searchParams]);

  const handleSearchChange = (event) => {
    setSelectedMarket(event.target.value);
  };

  const disableButton = tickerInput.length < 1;

  return (
    <Box>
      <Typography marginY={2} variant="h4">
        Search
      </Typography>
      <Routes>
        <Route
          path="/"
          element={
            <TickerInput
              setTickerInput={setTickerInput}
              selectedMarket={selectedMarket}
              handleChange={handleSearchChange}
              getTickerInfo={getTickerInfo}
              disableButton={disableButton}
            />
          }
        />
        <Route
          path="/*"
          element={
            <SearchedTicker
              ticker={ticker}
              tickerInput={tickerInput}
              setTickerFound={setTickerFound}
              tickerFound={tickerFound}
              selectedMarket={selectedMarket}
              searchedTicker={searchedTicker}
            />
          }
        />
      </Routes>
    </Box>
  );
}

export default SearchPage;
