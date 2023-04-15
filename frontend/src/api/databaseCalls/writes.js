export async function addToWatchList({
  tickerInput,
  watchList,
  selectedMarket,
  userId,
}) {
  watchList.forEach((el) => {
    if (el.symbol.toUpperCase() === tickerInput.toUpperCase()) {
      return;
    }
  });
  const res = await fetch(`/watchlist/addticker/${tickerInput}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      type: selectedMarket,
      index: watchList.length,
      userId,
    }),
  });
  const data = await res.json();
  return data;
}

export async function updateWatchlistPrices({ watchList }) {
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

export async function editPortfolio({ updatedPortfolio }) {
  console.log(updatedPortfolio);
  const res = await fetch(`/portfolio/buyOrSellTicker`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      updatedPortfolio,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function postBalance({ balance }) {
  if (typeof Number(balance) !== "number" || balance < 1) return;

  const res = await fetch("/portfolio/addbalance", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      balance: balance,
      deposits: balance,
      withdrawals: 0,
    }),
  });
  const data = await res.json();
  return data.portfolio[0].balance;
}

export async function editBalance({
  currentBalance,
  withdrawOrDeposit,
  amount,
  deposits,
  withdrawals,
}) {
  if (!Number(amount) || Number(amount) < 1) return;
  const newBalance =
    withdrawOrDeposit === "withdraw"
      ? Number(currentBalance) - Number(amount)
      : Number(currentBalance) + Number(amount);
  //PUT REQUESTS TO DEPOSIT FUNDS

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
    }),
  });
  const data = await res.json();
  return data.portfolio[0].balance;
}
