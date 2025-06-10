import { Photo } from "@/types/photo";
import { getSupabaseClient } from "./db";

export async function insertPhoto(photos: Photo[]) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("photos").insert(photos);
  if (error) throw error;
  return data;
}

export async function getPhotos(
  page: number = 1,
  limit: number = 50
): Promise<Photo[] | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  if (error) throw error;
  return data;
}

export async function getPhotosTotal(): Promise<number | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("photos").select("count", {
    count: "exact",
  });

  if (error) {
    return undefined;
  }

  return data[0].count;
}

export async function updatePhotoStatus(uuid: string, status: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("photos")
    .update({ status })
    .eq("uuid", uuid);
  if (error) throw error;
  return data;
}
