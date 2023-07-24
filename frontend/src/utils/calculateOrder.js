import { concat } from "lodash";

export function calculatePurchase({ currentPortfolio, order }) {
  const symbol = order.tickerInput;
  const price = Number(order.ticker.stock.Price);
  const { type } = order.ticker;
  const { selectedPurchaseMetric } = order;
  const { transactionAmount } = order;

  const dollarAmount =
    selectedPurchaseMetric === "Buy in $"
      ? transactionAmount
      : transactionAmount * price;
  const shares =
    selectedPurchaseMetric === "Buy Shares" || "Buy Coins"
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
      type,
      dollarAmount: currentShares.dollarAmount + dollarAmount,
      shares: currentShares.shares + shares,
    };
  } else {
    updatedTicker = {
      symbol: order.tickerInput,
      price,
      type,
      dollarAmount,
      shares,
    };
  }
  const filteredPortfolio = currentPortfolio.ownedTickers.filter(
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
  const { type } = order.ticker;
  const { selectedPurchaseMetric } = order;
  const { transactionAmount } = order;

  const dollarAmount =
    selectedPurchaseMetric === "Sell in $"
      ? transactionAmount
      : transactionAmount * price;
  const shares =
    selectedPurchaseMetric === "Sell Shares" || "Sell Coins"
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
      type,
      dollarAmount: currentShares.dollarAmount + dollarAmount,
      shares: currentShares.shares + shares,
    };
  } else {
    updatedTicker = {
      symbol: order.tickerInput,
      price,
      type,
      dollarAmount,
      shares,
    };
  }
  const filteredPortfolio = currentPortfolio.ownedTickers.filter(
    (ticker) => ticker.symbol !== symbol
  );

  const updatedPortfolio = {
    ownedTickers: concat(updatedTicker, filteredPortfolio),
    balance: newBalance,
  };
  return updatedPortfolio;
}
