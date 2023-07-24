import { Box, MenuItem, Select, TextField, Button } from "@mui/material";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

export function TickerInput({
  setTickerInput,
  handleChange,
  disableButton,
  selectedMarket,
  tickerInput,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // grabs ticker input for fetch
  async function getTickerInfo() {
    searchParams.set("symbol", tickerInput);
    searchParams.set("market", selectedMarket);
    navigate({
      pathname: "ticker",
      search: `${createSearchParams(searchParams)}`,
    });
  }
  return (
    <Box display="flex" marginY={2} sx={{ maxWidth: 500 }}>
      <TextField
        label="Ticker Search"
        onChange={(e) => setTickerInput(e.target.value)}
        required
      />
      <Box>
        <Select value={selectedMarket} onChange={handleChange}>
          <MenuItem value="stock">Stock</MenuItem>
          <MenuItem value="crypto">Crypto</MenuItem>
        </Select>
      </Box>
      <Button
        onClick={() => getTickerInfo({ tickerInput, selectedMarket })}
        variant="contained"
        disabled={disableButton}
      >
        Search
      </Button>
    </Box>
  );
}
