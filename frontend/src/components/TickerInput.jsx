import { Box, MenuItem, Select, TextField, Button } from "@mui/material";
export function TickerInput({
  setTickerInput,
  selectedMarket,
  handleChange,
  getTickerInfo,
  disableButton,
}) {
  return (
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
  );
}
