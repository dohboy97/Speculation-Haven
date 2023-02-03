import SavedTickers from "./SavedTickers";
import { Box, Typography } from "@mui/material";
import Loader from "./Loader";
function Watchlist({ tickers, setState, isLoading }) {
  //separation of stocks and crpyto
  const stockSkeletonBars = tickers.reduce(
    (acc, val) => (val.type === "stock" ? acc + 1 : acc + 0),
    0
  );
  const cryptoSkeletonBars = tickers.length - stockSkeletonBars;

  return (
    <Box>
      <Typography variant="h4">Stocks</Typography>
      {isLoading && (
        <Box>
          <Loader number={stockSkeletonBars}></Loader>
        </Box>
      )}
      {!isLoading &&
        tickers.map((el, index) => {
          if (el.type === "stock") {
            return (
              <SavedTickers
                key={tickers[index]._id}
                ticker={el}
                state={tickers}
                setState={setState}
                index={index}
              />
            );
          } else {
            return null;
          }
        })}
      <Typography variant="h4">Crypto</Typography>
      {isLoading && (
        <Box>
          <Loader number={cryptoSkeletonBars}></Loader>
        </Box>
      )}
      {!isLoading &&
        tickers.map((el, index) => {
          if (el.type === "crypto") {
            return (
              <SavedTickers
                key={tickers[index]._id}
                ticker={el}
                state={tickers}
                setState={setState}
                index={index}
              />
            );
          } else {
            return null;
          }
        })}
    </Box>
  );
}

export default Watchlist;
