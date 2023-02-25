import { Box, Typography, Button } from "@mui/material";
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
    <Box>
      {ownedTickers.map((ticker) => (
        <OwnedTicker key={ticker.symbol} ticker={ticker} />
      ))}
    </Box>
  );
}

function OwnedTicker({ ticker }) {
  return (
    <Box
      paddingX="10px"
      marginBottom={2}
      borderRadius="3px"
      display="flex"
      justifyContent="space-between"
    >
      <Box marginRight="25px">
        <Typography
          fontSize={16}
          variant="overline"
        >{`${ticker.symbol} : `}</Typography>
        <Typography
          fontSize={16}
          variant="overline"
        >{`$${ticker.price}`}</Typography>
      </Box>
      <Button size="small" variant="contained">
        Sell
      </Button>
    </Box>
  );
}
