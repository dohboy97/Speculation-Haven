import { useState, useEffect } from "react";

import Watchlist from "./components/Watchlist";
import { Typography, Button, Box } from "@mui/material";
import { getWatchList, updateWatchlistPrices } from "../../api";
import { useContext } from "react";
import { UserContext } from "../../context";

function WatchListPage() {
  const user = useContext(UserContext);
  const userId = user._id;
  const [watchList, setWatchList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    setIsLoading(true);

    const updates = await updateWatchlistPrices({ watchList: watchList });
    setWatchList(updates);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getWatchList({ userId })
      .then((response) => {
        console.log(response.stonks);
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
