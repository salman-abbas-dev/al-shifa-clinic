import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { ApiError } from "@/lib/utils/api-error";

type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];

export async function createAppointmentRecord(data: AppointmentInsert) {
  const supabase = await createClient();

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Supabase Insert Error (Appointments):", error);
    throw new ApiError("Failed to save appointment to the database", 500);
  }

  return appointment;
}

export async function checkTimeSlotConflict(date: string, time: string): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("appointments")
    .select("id")
    .eq("appointment_date", date)
    .eq("appointment_time", time)
    .neq("status", "cancelled")
    .limit(1);

  if (error) {
    throw new ApiError("Failed to verify appointment availability", 500);
  }

  return data.length > 0;
}