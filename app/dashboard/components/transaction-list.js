import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";

const groupAndSumTransactionByDate = (transactions) => {
  const grouped = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0];

    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  }

  return grouped
}


export default async function TransactionList() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const response = await fetch(
    `${process.env.API_URL}/transactions`,
    {
      next: {
        tags: ['transaction-list']
      }
    }
  );

  const transactions = await response.json();

  await delay(3000);
  const grouped = groupAndSumTransactionByDate(transactions)

  return (
    <div className="space-y-8">
      { Object.entries(grouped)
        .map(([date, { transactions, amount }]) => {
          return (
            <div key={date}>
              <TransactionSummaryItem date={date} amount={amount} />
              <Separator />
              <section className="space-y-4">
                { transactions.map(transaction => <div key={transaction.id}>
                  <TransactionItem
                    { ...transaction }
                    // type={transaction.type}
                    // category={transaction.category}
                    // description={transaction.description}
                    // amount={transaction.amount}
                  ></TransactionItem>
                </div>) }
              </section>
            </div>
          )
        })
      }
    </div>
  );
}