export async function getWatchList() {
  const res = await fetch("/watchlist");
  const data = await res.json();
  return data;
}

export async function getPortfolio() {
  const res = await fetch("/portfolio");
  const data = await res.json();
  return data;
}
