'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server";
import { transactionSchema } from "./validation";
import { redirect } from "next/navigation";

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

export async function updateTransaction(id, formData) {
  const supabase = await createClient();
  
  // validate data
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const { error } = await supabase
    .from('transactions')
    .update(formData)
    .eq('id', id);

  if (error) {
    throw new Error('Failed update the transaction')
  }

  revalidatePath('/dashboard')
}

export async function login(prevState, formData) {
  const supabase = await createClient();
  const email = formData.get('email');
  console.log('email', email);
  
  const { error } = supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true
    }
  })
  if (error) {
    return {
      error: true,
      message: 'Error authenticating!'
    }
  }
  return {
    message: `Email sent to ${email}`
  }
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/login");
}