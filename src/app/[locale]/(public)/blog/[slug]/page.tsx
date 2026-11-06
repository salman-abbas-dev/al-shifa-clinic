import { getBlogBySlug } from "@/repositories/public-content.repository"
import { getLocalized } from "@/lib/utils/locale-mapper"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { JsonLd } from "@/components/seo/json-ld"
import { ChevronLeft, Calendar, User } from "lucide-react"
import Image from "next/image"

// Generate Dynamic SEO Metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string, slug: string }> 
}) {
  const { locale, slug } = await params
  const blog = await getBlogBySlug(slug)
  
  if (!blog) return {}

  const title = blog[`seo_title_${locale}` as keyof typeof blog] as string || getLocalized(blog, "title", locale)
  const description = blog[`meta_description_${locale}` as keyof typeof blog] as string || getLocalized(blog, "excerpt", locale)
  const imageUrl = blog.featured_image_url || "/images/default-blog.jpg"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.published_at || blog.created_at,
      authors: [blog.profiles?.full_name || "Dr. Ahmed Ali"],
      images: [imageUrl],
    },
  }
}

export default async function BlogDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string, slug: string }> 
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const blog = await getBlogBySlug(slug)
  
  if (!blog) notFound()

  const title = getLocalized(blog, "title", locale)
  const content = getLocalized(blog, "content", locale) || getLocalized(blog, "excerpt", locale)
  const categoryName = blog.blog_categories ? getLocalized(blog.blog_categories, "name", locale) : ""
  const authorName = blog.profiles?.full_name || "Dr. Ahmed Ali"
  const date = new Date(blog.published_at || blog.created_at).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
  const imageUrl = blog.featured_image_url || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": [imageUrl],
    "datePublished": blog.published_at || blog.created_at,
    "dateModified": blog.updated_at,
    "author": [{
      "@type": "Person",
      "name": authorName,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`
    }]
  }

  return (
    <article className="bg-white min-h-screen pb-16">
      <JsonLd data={articleSchema} />
      
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-clinic-forest/90 via-clinic-forest/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="h-4 w-4 me-1 rtl:rotate-180" />
              Back to Blogs
            </Link>
            
            {categoryName && (
              <span className="inline-block bg-clinic-gold text-clinic-forest text-xs font-bold px-3 py-1 rounded-full mb-4">
                {categoryName}
              </span>
            )}
            
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">{title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
        <div className="prose prose-lg max-w-none prose-headings:text-clinic-forest prose-a:text-clinic-sage hover:prose-a:text-clinic-forest prose-img:rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: content }} className="whitespace-pre-wrap" />
        </div>
      </div>
    </article>
  )
}