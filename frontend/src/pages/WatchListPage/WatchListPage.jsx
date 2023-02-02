import { useState, useEffect } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Watchlist from "../../components/Watchlist";
import Selector from "../../components/Selector";
import { Typography } from "@mui/material";

function WatchListPage() {
  //useState for stock count on page, useEffect for fetch?

  const [watchList, setWatchList] = useState([]);
  const [tickerFound, setTickerFound] = useState(true);
  const [tickerInput, setTickerInput] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWatchList() {
      const res = await fetch("/watchlist");
      const data = await res.json();
      //setState of watchlist here on page load

      if (watchList.length === 0 && data.stonks.length > 0) {
        console.log("stonkscity updated in useeffect on load");
        setWatchList(data.stonks);
      }
    }
    getWatchList();

    if (loading) {
      //passes each el of watchlist to the server to update prices, then uses map to update itself in state
      let updatedArr = [];

      async function updatePrices() {
        watchList.forEach(async (el, index) => {
          const res = await fetch(`/watchlist/updateticker/${el._id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              symbol: el.symbol,
              price: el.price,
              type: el.type,
              index: el.index,
            }),
          });
          const data = await res.json();

          updatedArr.push(data.updatedStonk[0]);
          updatedArr.sort((a, b) => {
            if (a.index < b.index) {
              return -1;
            } else {
              return 1;
            }
          });

          //retain order

          setWatchList([...updatedArr]);
        });
        setLoading(false);
      }
      updatePrices();
    }
  }, [watchList, loading]);

  return (
    <div className="App">
      <Typography variant="h4">Watchlist</Typography>

      <Button handleClick={() => setLoading(true)} text="Update Prices" />
      <Watchlist
        tickers={watchList}
        setState={setWatchList}
        tickerFound={tickerFound}
        tickerInput={tickerInput}
      />
    </div>
  );
}

export default WatchListPage;
