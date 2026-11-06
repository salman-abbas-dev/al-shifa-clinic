import { createClient } from "@/lib/supabase/server"

export async function getDashboardStats() {
  const supabase = await createClient()

  const [
    { count: totalAppointments },
    { count: pendingAppointments },
    { count: totalBlogs },
    { count: unreadInquiries }
  ] = await Promise.all([
    supabase.from("appointments").select("*", { count: "exact", head: true }),
    supabase.from("appointments").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("*", { count: "exact", head: true }).eq("is_read", false)
  ])

  return {
    appointments: {
      total: totalAppointments || 0,
      pending: pendingAppointments || 0,
    },
    blogs: totalBlogs || 0,
    inquiries: unreadInquiries || 0
  }
}

export async function getAdminAppointments() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}