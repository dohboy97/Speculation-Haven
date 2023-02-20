import { concat } from "lodash";

export function calculatePurchase({ currentPortfolio, order }) {
  const symbol = order.tickerInput;
  const price = Number(order.ticker.stock.Price);
  const type = order.ticker.type;
  const selectedPurchaseMetric = order.selectedPurchaseMetric;
  const transactionAmount = order.transactionAmount;

  const dollarAmount =
    selectedPurchaseMetric === "Buy in $"
      ? transactionAmount
      : transactionAmount * price;
  const shares =
    selectedPurchaseMetric === "Buy Shares"
      ? transactionAmount
      : transactionAmount / price;
  const newBalance = currentPortfolio.balance - dollarAmount;
  let alreadyOwnsTicker = false;

  let currentShares;
  currentPortfolio.ownedTickers.forEach((ticker) => {
    if (ticker.symbol === symbol) {
      alreadyOwnsTicker = true;
      currentShares = ticker;
    }
  });

  let updatedTicker = {};

  if (alreadyOwnsTicker) {
    const avgSharePrice = currentShares.dollarAmount / currentShares.shares;

    updatedTicker = {
      symbol: order.tickerInput,
      price: avgSharePrice,
      type: type,
      dollarAmount: currentShares.dollarAmount + dollarAmount,
      shares: currentShares.shares + shares,
    };
  } else {
    updatedTicker = {
      symbol: order.tickerInput,
      price: price,
      type: type,
      dollarAmount: dollarAmount,
      shares: shares,
    };
  }
  let filteredPortfolio = currentPortfolio.ownedTickers.filter(
    (ticker) => ticker.symbol !== symbol
  );

  const updatedPortfolio = {
    ownedTickers: concat(updatedTicker, filteredPortfolio),
    balance: newBalance,
  };
  return updatedPortfolio;
}

export function calculateSale({ currentPortfolio, order }) {
  const symbol = order.tickerInput;
  const price = Number(order.ticker.stock.Price);
  const type = order.ticker.type;
  const selectedPurchaseMetric = order.selectedPurchaseMetric;
  const transactionAmount = order.transactionAmount;

  const dollarAmount =
    selectedPurchaseMetric === "Sell in $"
      ? transactionAmount
      : transactionAmount * price;
  const shares =
    selectedPurchaseMetric === "Sell Shares"
      ? transactionAmount
      : transactionAmount / price;
  const newBalance = currentPortfolio.balance - dollarAmount;
  let alreadyOwnsTicker = false;
  console.log(dollarAmount);
  console.log(shares);
  let currentShares;
  currentPortfolio.ownedTickers.forEach((ticker) => {
    if (ticker.symbol === symbol) {
      alreadyOwnsTicker = true;
      currentShares = ticker;
    }
  });

  let updatedTicker = {};

  if (alreadyOwnsTicker) {
    const avgSharePrice = currentShares.dollarAmount / currentShares.shares;

    updatedTicker = {
      symbol: order.tickerInput,
      price: avgSharePrice,
      type: type,
      dollarAmount: currentShares.dollarAmount + dollarAmount,
      shares: currentShares.shares + shares,
    };
  } else {
    updatedTicker = {
      symbol: order.tickerInput,
      price: price,
      type: type,
      dollarAmount: dollarAmount,
      shares: shares,
    };
  }
  let filteredPortfolio = currentPortfolio.ownedTickers.filter(
    (ticker) => ticker.symbol !== symbol
  );

  const updatedPortfolio = {
    ownedTickers: concat(updatedTicker, filteredPortfolio),
    balance: newBalance,
  };
  return updatedPortfolio;
}
