import { concat } from "lodash";

export function calculateOrder({ currentPortfolio, order }) {
  const symbol = order.tickerInput;
  const price = Number(order.ticker.stock.Price);
  const type = order.ticker.type;
  const selectedPurchaseMetric = order.selectedPurchaseMetric;
  const purchaseAmount = order.purchaseAmount;
  const dollarAmount =
    selectedPurchaseMetric === "Buy in $"
      ? purchaseAmount
      : purchaseAmount * price;
  const shares =
    selectedPurchaseMetric === "Buy Shares"
      ? purchaseAmount
      : purchaseAmount / price;
  let currentPortIncludesPurchase = false;

  let currentShares;
  currentPortfolio.ownedTickers.forEach((ticker) => {
    if (ticker.symbol === symbol) {
      currentPortIncludesPurchase = true;
      currentShares = ticker;
    }
  });

  let updatedTicker = {};

  if (currentPortIncludesPurchase) {
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

  const updatedPortfolio = concat(updatedTicker, filteredPortfolio);
  return updatedPortfolio;
}
