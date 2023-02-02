import { useState, useEffect } from "react";

import Watchlist from "../../components/Watchlist";
import { Typography } from "@mui/material";
import { getWatchList, updateStockPrice } from "../../api";
import { Button } from "@mui/material";

function WatchListPage() {
  //useState for stock count on page, useEffect for fetch?

  const [watchList, setWatchList] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    updateStockPrice({ ticker: watchList[0] })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWatchList()
      .then((response) => setWatchList(response.stonks))
      .catch((error) => console.error(error));
  }, [setWatchList]);

  return (
    <div className="App">
      <Typography variant="h4">Watchlist</Typography>

      <Button variant="contained" onClick={handleUpdate}>
        Update Prices
      </Button>
      <Watchlist tickers={watchList} setState={setWatchList} />
    </div>
  );
}

export default WatchListPage;
