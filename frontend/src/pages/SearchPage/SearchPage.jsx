import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SearchedTicker from "../../components/SearchedTicker";
import { getTickerFromServer } from "../../api";

import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
function SearchPage() {
  //detect and use search input to then take to server api and retrieve ticker info
  const [tickerFound, setTickerFound] = useState();
  const [tickerInput, setTickerInput] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("stock");
  const [ticker, setTicker] = useState();

  //grabs ticker input for fetch
  async function getTicker() {
    let input = document.querySelector(".search").value.toUpperCase();
    setTickerInput(input);
    setTickerFound();
    const data = await getTickerFromServer({
      input: input,
      selectedMarket: selectedMarket,
    });
    data === "error" ? setTickerFound(false) : setTickerFound(true);
    setTicker(data);
  }

  const handleChange = (event) => {
    setSelectedMarket(event.target.value);
  };

  return (
    <div>
      <h1>Search</h1>

      <Input className="search" placeholder="Ticker Search" />

      <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Market Type</InputLabel>
          <Select value={selectedMarket} label="Age" onChange={handleChange}>
            <MenuItem value={"stock"}>Stock</MenuItem>
            <MenuItem value={"crypto"}>Crypto</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <SearchedTicker
        ticker={ticker}
        detectInput={setTickerInput}
        tickerInput={tickerInput}
        setTickerFound={setTickerFound}
        tickerFound={tickerFound}
        selectedMarket={selectedMarket}
      />
      <Button handleClick={getTicker} text="Search" />
    </div>
  );
}

export default SearchPage;
