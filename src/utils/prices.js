// True when the current Steam price matches (or beats) the lowest price Steam ever charged
export const isAtHistoricalLow = (price, steamLowest) =>
  price > 0 && steamLowest > 0 && price <= steamLowest
