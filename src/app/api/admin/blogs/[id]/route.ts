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
    await requireAdmin()
    const body = await request.json()

    const supabase = await createClient()
    const { error } = await supabase
      .from("blog_posts")
      .update({ is_published: body.is_published, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true, message: "Blog status updated." })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await requireAdmin()
    
    const supabase = await createClient()
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true, message: "Blog deleted successfully." })
  } catch (error) {
    return handleApiError(error)
  }
}