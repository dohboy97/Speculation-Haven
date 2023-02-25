import { Typography, Box, Button, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../../api";

export default function OwnedTickers() {
  const [ownedTickers, setOwnedTickers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPortfolio()
      .then((portfolio) => setOwnedTickers(portfolio.portfolio[0].ownedTickers))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Box width="50%">
        <Skeleton height={32} />
        <Skeleton height={32} />
        <Skeleton height={32} />
        <Skeleton height={32} />
      </Box>
    );
  }
  if (!ownedTickers) return null;
  return (
    <Grid width="75%" container>
      <Grid container spacing={4}>
        <Grid xs={2} item>
          <Typography fontSize={16} variant="overline">
            Ticker
          </Typography>
        </Grid>
        <Grid xs={2} item>
          <Typography fontSize={16} variant="overline">
            Cost
          </Typography>
        </Grid>
        <Grid xs={2} item>
          <Typography fontSize={16} variant="overline">
            Shares
          </Typography>
        </Grid>
        <Grid xs={2} item>
          <Typography fontSize={16} variant="overline">
            $ Amount
          </Typography>
        </Grid>
      </Grid>
      {ownedTickers.map((ticker) => (
        <OwnedTicker key={ticker.symbol} ticker={ticker} />
      ))}
    </Grid>
  );
}

function OwnedTicker({ ticker }) {
  return (
    <Grid container spacing={4}>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {ticker.symbol}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {ticker.price}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {ticker.shares}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {ticker.dollarAmount}
        </Typography>
      </Grid>
    </Grid>
  );
}
