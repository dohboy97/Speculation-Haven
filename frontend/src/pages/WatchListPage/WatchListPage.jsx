import { useState, useEffect } from "react";

import Watchlist from "../../components/Watchlist";
import { Typography, Button, Box } from "@mui/material";
import { getWatchList, updateStockPrices } from "../../api";

function WatchListPage() {
  //useState for stock count on page, useEffect for fetch?

  const [watchList, setWatchList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);

    const updates = await updateStockPrices({ watchList: watchList });
    await console.log(updates);
    // updates
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.error(err))
    //   .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    getWatchList()
      .then((response) => setWatchList(response.stonks))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [setWatchList, setIsLoading]);

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
