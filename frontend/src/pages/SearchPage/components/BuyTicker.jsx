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
import { editPortfolio } from "../../../api";
import { round } from "lodash";
import { toast } from "react-toastify";
import { calculatePurchase } from "../../../utils/calculateOrder";
export default function BuyTicker({
  selectedMarket,
  tickerInput,
  ticker,
  portfolio,
  setPortfolio,
}) {
  const [selectedPurchaseMetric, setSelectedPurchaseMetric] = useState(
    selectedMarket === "stock" ? "Buy Shares" : "Buy Coins"
  );
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const purchaseInputPlaceHolder =
    selectedPurchaseMetric === "Buy in $" ? "Dollar Amount" : "Quantity";

  const handlePurchase = () => {
    const order = {
      tickerInput: tickerInput,
      ticker: ticker,
      selectedPurchaseMetric: selectedPurchaseMetric,
      purchaseAmount: purchaseAmount,
    };

    const updatedPortfolio = calculatePurchase({
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

  useEffect(() => {
    setIsLoading(true);
    selectedMarket === "stock"
      ? setSelectedPurchaseMetric("Buy Shares")
      : setSelectedPurchaseMetric("Buy Coins");
    setIsLoading(false);
  }, [selectedMarket, setSelectedPurchaseMetric]);

  if (isLoading) {
    return <Skeleton variant="rounded" height={50} width={200}></Skeleton>;
  }

  return (
    <Box>
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
            {isStock && <MenuItem value={"Buy Shares"}>Buy Shares</MenuItem>}
            {!isStock && <MenuItem value={"Buy Coins"}>Buy Coins</MenuItem>}
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
  );
}
