import SavedTickers from "./SavedTickers";
function Watchlist({ tickers, setState }) {
  //separation of stocks and crpyto

  return (
    <div>
      <h2>Stocks</h2>
      {tickers.map((el, index) => {
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
      <h2>Crypto</h2>
      {tickers.map((el, index) => {
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
    </div>
  );
}

export default Watchlist;
