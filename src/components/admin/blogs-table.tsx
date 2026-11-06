"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Database } from "@/types/database.types"
import { Loader2, Trash2, Eye, EyeOff } from "lucide-react"

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"] & {
  blog_categories?: { name_en: string } | null
}

export function BlogsTable({ initialData }: { initialData: BlogPost[] }) {
  const [blogs, setBlogs] = useState(initialData)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !currentStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, is_published: !currentStatus } : b))
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update blog status.")
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return
    
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete blog")
      
      setBlogs(prev => prev.filter(b => b.id !== id))
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete blog post.")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-clinic-offwhite text-clinic-charcoal font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">Title (English)</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-clinic-offwhite/50 transition-colors">
                <td className="px-6 py-4 font-medium text-clinic-charcoal">
                  {blog.title_en}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {blog.blog_categories?.name_en || "Uncategorized"}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(blog.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.is_published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                    {blog.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  {loadingId === blog.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-clinic-forest" />
                  ) : (
                    <>
                      <button 
                        onClick={() => handleTogglePublish(blog.id, blog.is_published)}
                        className="text-clinic-sage hover:text-clinic-forest transition-colors"
                        title={blog.is_published ? "Unpublish" : "Publish"}
                      >
                        {blog.is_published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="text-destructive/70 hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}