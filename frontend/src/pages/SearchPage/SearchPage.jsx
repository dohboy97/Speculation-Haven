import { useState } from "react";
import SearchedTicker from "../../components/SearchedTicker";
import { getTickerFromServer } from "../../api";

import { Box, MenuItem, Select, TextField, Button } from "@mui/material";
function SearchPage() {
  //detect and use search input to then take to server api and retrieve ticker info
  const [tickerFound, setTickerFound] = useState();
  const [tickerInput, setTickerInput] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("stock");
  const [ticker, setTicker] = useState();

  //grabs ticker input for fetch
  async function getTickerInfo() {
    setTickerFound();
    const data = await getTickerFromServer({
      input: tickerInput,
      selectedMarket: selectedMarket,
    });
    data === "error" ? setTickerFound(false) : setTickerFound(true);
    setTicker(data);
  }

  const handleChange = (event) => {
    setSelectedMarket(event.target.value);
  };

  const disableButton = tickerInput.length < 1;

  return (
    <Box>
      <h1>Search</h1>
      <Box display="flex" sx={{ maxWidth: 500 }}>
        <TextField
          label="Ticker Search"
          onChange={(e) => setTickerInput(e.target.value)}
          required
        />
        <Box>
          <Select value={selectedMarket} onChange={handleChange}>
            <MenuItem value={"stock"}>Stock</MenuItem>
            <MenuItem value={"crypto"}>Crypto</MenuItem>
          </Select>
        </Box>
        <Button
          onClick={getTickerInfo}
          variant="contained"
          disabled={disableButton}
        >
          Search
        </Button>
      </Box>

      <SearchedTicker
        ticker={ticker}
        tickerInput={tickerInput}
        setTickerFound={setTickerFound}
        tickerFound={tickerFound}
        selectedMarket={selectedMarket}
      />
    </Box>
  );
}

export default SearchPage;
