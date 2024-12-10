'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server";
import { transactionSchema } from "./validation";

export async function createTransaction(formData) {
  const supabase = await createClient();
  
  // validate data
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const { error } = await supabase.from('transactions')
    .insert(validated.data);

  if (error) {
    throw new Error('Failed creating the transaction')
  }

  revalidatePath('/dashboard')
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
  const supabase = await createClient();
  
  let { data, error } = await supabase.rpc('fetch_transactions', {
    limit_arg: limit, 
    offset_arg: offset, 
    range_arg: range
  })
  if (error) throw new Error("We can't fetch transactions");

  console.log('data', data);
  
  return data;
}

export async function deleteTransaction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('transactions')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath('/dashboard');
}