import { Box, Typography, Button } from "@mui/material";
function SavedTickers({ ticker, state, setState, index }) {
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
      <Button
        size="small"
        variant="contained"
        onClick={async function () {
          setState(state.filter((el) => el !== ticker));
          await fetch(`/watchlist/deleteticker/${ticker._id}`, {
            method: "DELETE",
          });
        }}
      >
        Delete
      </Button>
    </Box>
  );
}

export default SavedTickers;
