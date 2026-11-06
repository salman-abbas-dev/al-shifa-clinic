import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/server-auth"
import { handleApiError } from "@/lib/utils/api-error"

export async function PATCH(request: Request) {
  try {
    await requireAdmin()

    const body = await request.json()
    const supabase = await createClient()

    // Assuming we only have one settings row (id can be managed or just update the first row)
    // For safety, we fetch the first row's ID, then update it.
    const { data: existingSettings } = await supabase.from("clinic_settings").select("id").limit(1).single()

    if (!existingSettings) {
      return NextResponse.json({ success: false, error: "Settings record not found." }, { status: 404 })
    }

    const { error } = await supabase
      .from("clinic_settings")
      .update({
        clinic_name_en: body.clinic_name_en,
        clinic_name_ur: body.clinic_name_ur,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        marham_url: body.marham_url,
        address_en: body.address_en,
        address_ur: body.address_ur,
        working_hours_en: body.working_hours_en,
        working_hours_ur: body.working_hours_ur,
        updated_at: new Date().toISOString()
      })
      .eq("id", existingSettings.id)

    if (error) throw error

    return NextResponse.json({ success: true, message: "Clinic settings updated successfully." })
  } catch (error) {
    return handleApiError(error)
  }
}