import { supabase } from "../lib/supabaseClient";
import { type Item } from "../types";

export const getItems = async (): Promise<Item[]> => {
  const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
};

export const getItem = async (id: number): Promise<Item | null> => {
  const { data, error } = await supabase.from("items").select("*").eq("id", id).single();
  if (error) throw error;
  return data || null;
};

export const createItem = async (payload: { title: string; description?: string }) => {
  const { data, error } = await supabase
    .from("items")
    .insert([{ ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateItem = async (id: number, payload: { title?: string; description?: string }) => {
  const { data, error } = await supabase.from("items").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteItem = async (id: number) => {
  const { error } = await supabase.from("items").delete().eq("id", id);

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
