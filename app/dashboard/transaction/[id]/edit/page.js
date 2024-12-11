import TransactionForm from "@/app/dashboard/components/transaction-form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Transaction"
}

export default async function Page({ params: {id} }) {
  console.log('id', id);
  
  const supabase = await createClient();
  const { data: transaction, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) notFound();

  console.log('transactionm', transaction);
  return (<>
    <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
    <TransactionForm initialData={transaction}/>
  </>);
}