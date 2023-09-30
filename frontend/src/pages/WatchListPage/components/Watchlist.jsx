import { Box, Typography } from "@mui/material";
import SavedTickers from "./SavedTickers";

function Watchlist({ watchlist, setWatchList }) {
  return (
    <Box width="max-content">
      <Typography marginBottom={2} variant="h4">
        Stocks
      </Typography>

      {watchlist.map((el, index) => {
        if (el.type === "stock") {
          return (
            <SavedTickers
              key={watchlist[index]._id}
              ticker={el}
              watchList={watchlist}
              setWatchList={setWatchList}
              index={index}
            />
          );
        }
        return null;
      })}
      <Typography marginBottom={2} variant="h4">
        Crypto
      </Typography>

      {watchlist.map((el, index) => {
        if (el.type === "crypto") {
          return (
            <SavedTickers
              key={watchlist[index]._id}
              ticker={el}
              watchList={watchlist}
              setWatchList={setWatchList}
              index={index}
            />
          );
        }
        return null;
      })}
    </Box>
  );
}

export default Watchlist;
