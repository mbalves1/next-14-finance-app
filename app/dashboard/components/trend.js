import BaseTrend from "@/components/trend";

export default async function Trend({ type }) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const response = await fetch(`${process.env.API_URL}/trends/${type}`);

  await delay(3000);
  const { amount, prevAmount } = await response.json();

  return (
    <BaseTrend type={type} amount={amount} prevAmount={prevAmount}  />
  )
}