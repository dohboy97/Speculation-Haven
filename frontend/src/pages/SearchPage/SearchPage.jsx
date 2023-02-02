import { useState } from "react";
import SearchedTicker from "../../components/SearchedTicker";
import { getTickerFromServer } from "../../api";

import { Box, Typography } from "@mui/material";
import { TickerInput } from "../../components/TickerInput";
function SearchPage() {
  //detect and use search input to then take to server api and retrieve ticker info
  const [tickerFound, setTickerFound] = useState();
  const [tickerInput, setTickerInput] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("stock");
  const [ticker, setTicker] = useState();
  const [searchedTicker, setSearchedTicker] = useState("");
  //grabs ticker input for fetch
  async function getTickerInfo() {
    setTickerFound();
    const data = await getTickerFromServer({
      input: tickerInput,
      selectedMarket: selectedMarket,
    });
    data === "error" ? setTickerFound(false) : setTickerFound(true);
    setTicker(data);
    setSearchedTicker(tickerInput.toUpperCase());
  }

  const handleSearchChange = (event) => {
    setSelectedMarket(event.target.value);
  };

  const disableButton = tickerInput.length < 1;

  return (
    <Box>
      <Typography variant="h4">Search</Typography>
      <TickerInput
        setTickerInput={setTickerInput}
        selectedMarket={selectedMarket}
        handleChange={handleSearchChange}
        getTickerInfo={getTickerInfo}
        disableButton={disableButton}
      />

      <SearchedTicker
        ticker={ticker}
        tickerInput={tickerInput}
        setTickerFound={setTickerFound}
        tickerFound={tickerFound}
        selectedMarket={selectedMarket}
        searchedTicker={searchedTicker}
      />
    </Box>
  );
}

export default SearchPage;
