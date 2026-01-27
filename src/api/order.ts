import { supabase } from "../lib/supabaseClient";
import { type Order } from "../types";

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
};

export const getOrder = async (id: number): Promise<Order | null> => {
  const { data, error } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data || null;
};

export const createOrder = async (payload: { title: string; description?: string }) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateOrder = async (id: number, payload: { title?: string; description?: string }) => {
  const { data, error } = await supabase.from("orders").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteOrder = async (id: number) => {
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage.from("Card Image").upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("Card Image").getPublicUrl(fileName);

  return data.publicUrl;
};
