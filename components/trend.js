export default function Trend({
  type, amount, prevAmount
}) {
  const calcPercentageChange = (amount, prevAmount) => {
    if (prevAmount === 0) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EUR'}).format(amount)

  return (
    <div>
      <div className="font-semibold">{type}</div>

      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        { amount ? formatCurrency(amount) : formatCurrency(0) }
      </div>
    </div>
  )
}