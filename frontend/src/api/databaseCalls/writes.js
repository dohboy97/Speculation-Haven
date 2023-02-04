export async function buyTicker({
  tickerInput,
  ticker,
  selectedPurchaseMetric,
  purchaseAmount,
}) {
  const symbol = tickerInput;
  const price = Number(ticker.stock.Price);
  const type = ticker.type;
  const dollarAmount =
    selectedPurchaseMetric === "buy in $"
      ? purchaseAmount
      : purchaseAmount * price;
  const shares =
    selectedPurchaseMetric === "buy shares"
      ? purchaseAmount
      : purchaseAmount / price;
  const res = await fetch(`/portfolio/buyOrSellTicker`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      type,
      symbol,
      dollarAmount,
      shares,
      price,
    }),
  });
  const data = await res.json();
  console.log(data.portfolio[0].ownedTickers);
}

export async function addToWatchList({ input, watchList, selectedMarket }) {
  watchList.forEach((el) => {
    if (el.symbol.toUpperCase() === input.toUpperCase()) {
      return;
    }
  });
  const res = await fetch(`/watchlist/addticker/${input}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      type: selectedMarket,
      index: watchList.length,
    }),
  });
  const data = await res.json();
  return data;
}

export async function updateStockPrices({ watchList }) {
  if (!watchList) return;
  const updates = await Promise.all(
    watchList.map(async (ticker) => {
      const res = await fetch(`/watchlist/updateticker/${ticker._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          symbol: ticker.symbol,
          price: ticker.price,
          type: ticker.type,
          index: ticker.index,
        }),
      });
      const data = await res.json();
      return data.updatedStonk[0];
    })
  );
  return updates;
}

export async function deleteFromWatchList({ ticker }) {
  await fetch(`/watchlist/deleteticker/${ticker._id}`, {
    method: "DELETE",
  });
}
