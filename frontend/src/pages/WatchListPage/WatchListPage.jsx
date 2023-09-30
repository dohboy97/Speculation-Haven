import { useState, useEffect, useContext } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Watchlist from "./components/Watchlist";
import { getWatchList, updateWatchlistPrices } from "../../api";

import { UserContext } from "../../context";

function WatchListPage() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const userId = user._id;
  const [watchList, setWatchList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    setIsLoading(true);

    const updates = await updateWatchlistPrices({
      watchList,
      userId
    });
    setWatchList(updates);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getWatchList({ userId })
      .then((response) => {
        setWatchList(response.stonks.watchList);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [setWatchList, setIsLoading, userId]);

  const hasWatchList = watchList.length > 0 && !isLoading;

  return (
    <Box width="100%" height="100%" className="App">
      <Typography marginY={2} variant="h4">
        Watchlist
      </Typography>

      {hasWatchList && (
        <Box>
          <Button
            sx={{ marginBottom: 4 }}
            variant="contained"
            onClick={handleUpdate}
          >
            Update Prices
          </Button>
          <Watchlist
            watchlist={watchList}
            setWatchList={setWatchList}
            isLoading={isLoading}
          />
        </Box>
      )}
      {!hasWatchList && !isLoading && (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems=" center"
          justifyContent="center"
        >
          <Typography variant="h6">Your watchlist is empty</Typography>
          <Button variant="outlined" onClick={() => navigate("/search")}>
            Find tickers to add
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default WatchListPage;
