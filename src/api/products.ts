import { supabase } from "../lib/supabaseClient";
import { type Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
};

export const getProduct = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) throw error;
  return data || null;
};

export const createProduct = async (payload: { name?: string; price?: number; category?: string; image_product?: FileList }) => {
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: number, payload: { name?: string; price?: number; category?: string; image_product?: FileList }) => {
  const { data, error } = await supabase.from("products").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage.from("Image_product").upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("Image_product").getPublicUrl(fileName);

  return data.publicUrl;
};
