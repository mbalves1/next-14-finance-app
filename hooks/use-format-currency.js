import { useMemo } from "react";

export const useFormatCurrency = (amount) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EUR'}).format(amount);
  }

  return useMemo(
    () => formatCurrency(amount),
    [amount]
  )
}
