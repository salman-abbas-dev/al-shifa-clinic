import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { ApiError } from "@/lib/utils/api-error";

type ContactInsert = Database['public']['Tables']['contact_inquiries']['Insert'];

export async function createContactInquiry(data: ContactInsert) {
  const supabase = await createClient();

  const { data: inquiry, error } = await supabase
    .from("contact_inquiries")
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Supabase Insert Error (Contact):", error);
    throw new ApiError("Failed to send your message. Please try again later.", 500);
  }

  return inquiry;
}