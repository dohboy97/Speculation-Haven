import { Typography, Box } from "@mui/material";

import Balance from "../../components/Balance";
function PortfolioPage() {
  //MAKE BALANCE AND PORTFOLIO BOTH INDIVIDUAL COMPONENTS

  return (
    <Box>
      <Typography marginY={2} variant="h4">
        Portfolio
      </Typography>
      <Balance />
      <Typography marginY={2} variant="h5">
        Owned tickers
      </Typography>
      <Typography variant="overline">
        Avg cost, quantity, total value
      </Typography>
    </Box>
  );
}

export default PortfolioPage;
