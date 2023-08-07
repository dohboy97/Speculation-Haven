export async function getWatchList({ userId }) {
  const res = await fetch(`/watchlist/${userId}`);

  const data = await res.json();
  return data;
}

export async function getPortfolio({ userId }) {
  const res = await fetch("/portfolio", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      userId
    })
  });
  const data = await res.json();
  return data.portfolio;
}
