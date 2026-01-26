import { supabase } from "../lib/supabaseClient";
import { type About } from "../types";

export const getAbouts = async (): Promise<About[]> => {
  const { data, error } = await supabase.from("about").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
};

export const getAbout = async (id: number): Promise<About | null> => {
  const { data, error } = await supabase.from("about").select("*").eq("id", id).single();
  if (error) throw error;
  return data || null;
};

export const createAbout = async (payload: { title: string; description?: string }) => {
  const { data, error } = await supabase
    .from("about")
    .insert([{ ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateAbout = async (id: number, payload: { title?: string; description?: string }) => {
  const { data, error } = await supabase.from("about").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteAbout = async (id: number) => {
  const { error } = await supabase.from("about").delete().eq("id", id);

  if (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage.from("about_image").upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("about_image").getPublicUrl(fileName);

  return data.publicUrl;
};
