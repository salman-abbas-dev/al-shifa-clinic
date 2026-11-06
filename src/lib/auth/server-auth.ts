import { createClient } from "@/lib/supabase/server";
import { ApiError } from "@/lib/utils/api-error";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new ApiError("Unauthorized", 401);
  }

  // Check role in profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new ApiError("Forbidden: Admin access required", 403);
  }

  return session.user;
}