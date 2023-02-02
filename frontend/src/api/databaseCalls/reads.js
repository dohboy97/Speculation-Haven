export async function getWatchList() {
  const res = await fetch("/watchlist");
  const data = await res.json();
  return data;
}

export async function updateStockPrice({ ticker }) {
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

  return data;
}
