import { Typography, Box } from "@mui/material";
import PortfolioSetup from "./components/PortfolioSetup";
import OwnedTickers from "./components/OwnedTickers";

function PortfolioPage() {
  // MAKE BALANCE AND PORTFOLIO BOTH INDIVIDUAL COMPONENTS

  return (
    <Box>
      <Typography marginY={2} variant="h4">
        Portfolio
      </Typography>
      <Typography marginY={2} variant="h5">
        Performance
      </Typography>
      <PortfolioSetup />
      <Typography marginY={2} variant="h5">
        Owned tickers
      </Typography>
      <Typography variant="overline">
        Avg cost, quantity, total value
      </Typography>
      <OwnedTickers />
    </Box>
  );
}

export default PortfolioPage;
