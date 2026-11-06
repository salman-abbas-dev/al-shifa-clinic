import { createClient } from "@/lib/supabase/server"
import { BlogsTable } from "@/components/admin/blogs-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

async function getAdminBlogs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name_en)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs()

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-clinic-forest">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">Manage your bilingual educational articles.</p>
        </div>
        <Button size="lg" className="shrink-0" disabled>
          <Plus className="h-5 w-5 mr-2" /> Create New Post
        </Button>
      </div>

      <BlogsTable initialData={blogs} />
    </div>
  )
}