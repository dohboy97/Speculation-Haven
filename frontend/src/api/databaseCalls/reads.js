export async function getWatchList() {
  const res = await fetch("/watchlist");
  const data = await res.json();
  return data;
}
