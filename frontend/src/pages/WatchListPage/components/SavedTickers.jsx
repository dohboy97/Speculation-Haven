import { Box, Typography, Button } from "@mui/material";
import { deleteFromWatchList } from "../../../api";
function SavedTickers({ ticker, watchList, setWatchList }) {
  const handleDeleteClick = async () => {
    deleteFromWatchList({ ticker })
      .then()
      .catch((err) => console.error(err));
    setWatchList(watchList.filter((el) => el !== ticker));
  };

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
      <Button size="small" variant="contained" onClick={handleDeleteClick}>
        Delete
      </Button>
    </Box>
  );
}

export default SavedTickers;
