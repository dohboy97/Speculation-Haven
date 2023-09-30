export async function addToWatchList({
  tickerInput,
  watchList,
  selectedMarket,
  userId
}) {
  const res = await fetch(`/watchlist/addticker/${tickerInput}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      type: selectedMarket,
      index: watchList.length,
      userId
    })
  });
  const data = await res.json();
  return data;
}

export async function updateWatchlistPrices({ watchList, userId }) {
  if (!watchList || !userId) return undefined;

  const res = await fetch(`/watchlist/updatewatchlist`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      watchList,
      userId
    })
  });
  const data = await res.json();
  return data.updatedWatchlist;
}

export async function deleteFromWatchList({ ticker, userId }) {
  await fetch(`/watchlist/deleteticker/${ticker._id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      userId
    })
  });
}

export async function editPortfolio({ updatedPortfolio, userId }) {
  console.log(updatedPortfolio);
  const res = await fetch(`/portfolio/buyOrSellTicker`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      updatedPortfolio,
      userId
    })
  });
  const data = await res.json();
  return data;
}

export async function postBalance({ balance, userId }) {
  if (typeof Number(balance) !== "number" || balance < 1) return undefined;

  const res = await fetch("/portfolio/addbalance", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      balance,
      deposits: balance,
      withdrawals: 0,
      userId
    })
  });
  const data = await res.json();
  return data.portfolio.balance;
}

export async function editBalance({
  currentBalance,
  withdrawOrDeposit,
  amount,
  deposits,
  withdrawals,
  userId
}) {
  if (!Number(amount) || Number(amount) < 1) return undefined;

  const newBalance =
    withdrawOrDeposit === "withdraw"
      ? Number(currentBalance) - Number(amount)
      : Number(currentBalance) + Number(amount);
  // PUT REQUESTS TO DEPOSIT FUNDS

  const newDeposits =
    withdrawOrDeposit === "deposit"
      ? Number(deposits) + Number(amount)
      : Number(deposits);

  const newWithdrawals =
    withdrawOrDeposit === "withdraw"
      ? Number(withdrawals) + Number(amount)
      : Number(withdrawals);

  const res = await fetch("/portfolio/editbalance", {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      balance: newBalance < 0 ? 0 : newBalance,
      deposits: newDeposits,
      withdrawals: newWithdrawals,
      userId
    })
  });
  const data = await res.json();
  return data.portfolio.balance;
}
