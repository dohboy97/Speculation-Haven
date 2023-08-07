import { useState, useEffect, useContext } from "react";
import { Typography, Button, Box } from "@mui/material";
import Watchlist from "./components/Watchlist";
import { getWatchList, updateWatchlistPrices } from "../../api";

import { UserContext } from "../../context";

function WatchListPage() {
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

  return (
    <Box className="App">
      <Typography marginY={2} variant="h4">
        Watchlist
      </Typography>

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
  );
}

export default WatchListPage;
