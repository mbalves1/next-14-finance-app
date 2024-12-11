import { createClient } from "@/lib/supabase/server";

export default async function Page({ params: {id} }) {
  console.log('id', id);
  
  const supabase = await createClient();
  const { data: transaction, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  console.log('transactionm', transaction);
  return (<>Hello!</>);
}