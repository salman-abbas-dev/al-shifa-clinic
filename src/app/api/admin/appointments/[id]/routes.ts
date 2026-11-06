import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/server-auth"
import { handleApiError } from "@/lib/utils/api-error"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await requireAdmin() // Validates server-side session and role

    const body = await request.json()
    const { status, notes } = body

    const supabase = await createClient()
    const { error } = await supabase
      .from("appointments")
      .update({ status, notes, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true, message: "Appointment updated successfully." })
  } catch (error) {
    return handleApiError(error)
  }
}