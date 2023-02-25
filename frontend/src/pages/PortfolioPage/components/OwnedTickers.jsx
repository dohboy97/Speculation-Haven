import { Box, Typography, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../../api";

export default function OwnedTickers() {
  const [ownedTickers, setOwnedTickers] = useState();

  useEffect(() => {
    getPortfolio().then((portfolio) =>
      setOwnedTickers(portfolio.portfolio[0].ownedTickers)
    );
  }, []);
  if (!ownedTickers) return null;
  return (
    <Grid container>
      <Grid container spacing={4}>
        <Grid item>
          <Typography fontSize={16} variant="overline">
            Ticker
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontSize={16} variant="overline">
            Cost
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
    <Grid container>
      <Grid container spacing={4}>
        <Grid item>
          <Typography fontSize={16} variant="overline">
            {ticker.symbol}
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontSize={16} variant="overline">
            {ticker.price}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
