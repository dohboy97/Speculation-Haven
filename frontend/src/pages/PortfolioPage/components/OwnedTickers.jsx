import { Typography, Box, Button, Grid, Skeleton } from "@mui/material";
import { lowerCase, round } from "lodash";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getPortfolio } from "../../../api";

export default function OwnedTickers() {
  const [ownedTickers, setOwnedTickers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPortfolio()
      .then((portfolio) => {
        if (portfolio.portfolio[0])
          setOwnedTickers(portfolio.portfolio[0].ownedTickers);
      })
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
            Cost Basis
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  if (ticker.shares === 0) return null;

  const handleViewClick = () => {
    searchParams.set("symbol", lowerCase(ticker.symbol));
    searchParams.set("market", ticker.type);
    navigate({
      pathname: "/search/ticker",
      search: `${createSearchParams(searchParams)}`,
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {ticker.symbol}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {round(ticker.price, 2)}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {round(ticker.shares, 2)}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontSize={16} variant="overline">
          {round(ticker.dollarAmount, 2)}
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Button onClick={handleViewClick} variant="contained">
          View
        </Button>
      </Grid>
    </Grid>
  );
}
