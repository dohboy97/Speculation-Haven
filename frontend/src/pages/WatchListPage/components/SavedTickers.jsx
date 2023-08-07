import { Box, Typography, Button } from "@mui/material";
import { lowerCase } from "lodash";
import { useContext } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { deleteFromWatchList } from "../../../api";
import { UserContext } from "../../../context";

function SavedTickers({ ticker, watchList, setWatchList }) {
  const user = useContext(UserContext);
  const userId = user._id;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleDeleteClick = async () => {
    deleteFromWatchList({ ticker, userId })
      .then()
      .catch((err) => console.error(err));
    setWatchList(watchList.filter((el) => el !== ticker));
  };

  const handleViewClick = () => {
    searchParams.set("symbol", lowerCase(ticker.symbol));
    searchParams.set("market", ticker.type);
    navigate({
      pathname: "/search/ticker",
      search: `${createSearchParams(searchParams)}`
    });
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
      <Box display="flex" gap={2}>
        <Button size="small" variant="contained" onClick={handleViewClick}>
          View
        </Button>
        <Button size="small" variant="contained" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default SavedTickers;
