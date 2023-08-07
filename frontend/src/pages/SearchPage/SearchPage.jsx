import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Route, Routes, useSearchParams } from "react-router-dom";
import SearchedTicker from "./components/SearchedTicker";
import { getTickerFromServer } from "../../api";
import { TickerInput } from "./components/TickerInput";

function SearchPage() {
  const [searchParams] = useSearchParams();
  // detect and use search input to then take to server api and retrieve ticker info
  const [tickerFound, setTickerFound] = useState();
  const [tickerInput, setTickerInput] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("stock");
  const [ticker, setTicker] = useState();
  const [searchedTicker, setSearchedTicker] = useState("");

  useEffect(() => {
    setTickerFound();

    const tickerSearched = searchParams.get("symbol");
    const market = searchParams.get("market");
    if (!tickerSearched || !market) return;

    getTickerFromServer({
      input: tickerSearched,
      selectedMarket: market
    }).then((data) => {
      setTicker(data);
      if (data === "error") {
        setTickerFound(false);
      } else {
        setTickerFound(true);
      }
    });
    setSearchedTicker(tickerSearched.toUpperCase());
    setTickerInput(tickerSearched);
    setSelectedMarket(market);
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
              disableButton={disableButton}
              tickerInput={tickerInput}
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
