import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server";
import { groupAndSumTransactionByDate } from "@/lib/utils";

export default async function TransactionList({ range }) {

  const supabase = await createClient();
  
  let { data: transactions, error } = await supabase
  .rpc('fetch_transactions', {
    // limit_arg, 
    // offset_arg, 
    range_arg: range
  })
  if (error) throw new Error("We can't fetch transactions");

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