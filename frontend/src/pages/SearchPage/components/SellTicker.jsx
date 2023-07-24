import {
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { round } from "lodash";
import { toast } from "react-toastify";
import { calculateSale } from "utils";
import { editPortfolio } from "../../../api";

export default function SellTicker({
  selectedMarket,
  tickerInput,
  ticker,
  portfolio,
  setPortfolio,
}) {
  const [selectedSaleMetric, setSelectedSaleMetric] = useState(
    selectedMarket === "stock" ? "Sell Shares" : "Sell Coins"
  );
  const [saleAmount, setSaleAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const saleInputPlaceHolder =
    selectedSaleMetric === "Sell in $" ? "Dollar Amount" : "Quantity";

  const handleSale = () => {
    const order = {
      tickerInput,
      ticker,
      selectedPurchaseMetric: selectedSaleMetric,
      transactionAmount: saleAmount * -1,
    };

    const updatedPortfolio = calculateSale({
      currentPortfolio: portfolio,
      order,
    });
    editPortfolio({
      updatedPortfolio,
    })
      .then((res) => {
        console.log(res);
        setPortfolio(res.portfolio[0]);
      })
      .catch((err) => console.error(err))
      .finally(() => toast.success("Sale Successful"));
  };

  const saleTotal =
    selectedSaleMetric === "Sell in $"
      ? saleAmount
      : Number(ticker.stock.Price) * saleAmount;

  const ownedShareTotal =
    portfolio.ownedTickers.find(
      (el) => el.symbol.toUpperCase() === tickerInput.toUpperCase()
    )?.dollarAmount || 0;

  const invalidPurchase = saleTotal < 1 || saleTotal > ownedShareTotal;

  const disabledPurchase = !saleAmount || invalidPurchase;

  const invalidFeedback =
    saleTotal < 1
      ? "Please enter a positive number"
      : `Purchase exceeds your ${tickerInput.toUpperCase()} shares owned by $${round(
          saleTotal - ownedShareTotal,
          2
        )}`;

  const isStock = selectedMarket === "stock";

  useEffect(() => {
    setIsLoading(true);

    selectedMarket === "stock"
      ? setSelectedSaleMetric("Sell Shares")
      : setSelectedSaleMetric("Sell Coins");
    setIsLoading(false);
  }, [selectedMarket, setSelectedSaleMetric]);

  if (isLoading) {
    return <Skeleton variant="rounded" height={50} width={200} />;
  }

  return (
    <Box>
      <Box marginY={2} display="flex" sx={{ minWidth: 800 }}>
        <TextField
          label={saleInputPlaceHolder}
          onChange={(e) => setSaleAmount(Number(e.target.value))}
        />
        <Box>
          <Select
            value={selectedSaleMetric}
            onChange={(e) => setSelectedSaleMetric(e.target.value)}
          >
            {isStock && <MenuItem value="Sell Shares">Sell Shares</MenuItem>}
            {!isStock && <MenuItem value="Sell Coins">Sell Coins</MenuItem>}
            <MenuItem value="Sell in $">Sell in $</MenuItem>
          </Select>
        </Box>
        <Button
          variant="contained"
          onClick={handleSale}
          disabled={disabledPurchase}
        >
          Submit
        </Button>
      </Box>
      {!!saleAmount && (
        <Typography marginTop={2} variant="subtitle">
          {invalidPurchase ? invalidFeedback : `Total: $${round(saleTotal, 2)}`}
        </Typography>
      )}
      {!saleAmount && (
        <Typography marginTop={2} variant="subtitle">
          Please enter a valid number if you wish to sell
        </Typography>
      )}
    </Box>
  );
}
