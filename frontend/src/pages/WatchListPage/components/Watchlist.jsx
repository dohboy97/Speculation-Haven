import { Box, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import SavedTickers from "./SavedTickers";

function Watchlist({ watchlist, setWatchList }) {
  const savedStockTickers = watchlist.filter((el) => el.type === "stock");

  const savedCryptoTickers = watchlist.filter((el) => el.type === "crypto");

  return (
    <Box width="max-content">
      {!isEmpty(savedStockTickers) && (
        <Box>
          <Typography marginBottom={2} variant="h4">
            Stocks
          </Typography>

          {savedStockTickers.map((el, index) => {
            return (
              <SavedTickers
                key={watchlist[index]._id}
                ticker={el}
                watchList={watchlist}
                setWatchList={setWatchList}
                index={index}
              />
            );
          })}
        </Box>
      )}

      {!isEmpty(savedCryptoTickers) && (
        <Box>
          <Typography marginBottom={2} variant="h4">
            Crypto
          </Typography>

          {savedCryptoTickers.map((el, index) => {
            return (
              <SavedTickers
                key={watchlist[index]._id}
                ticker={el}
                watchList={watchlist}
                setWatchList={setWatchList}
                index={index}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default Watchlist;
