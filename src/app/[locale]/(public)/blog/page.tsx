import { getPublishedBlogs } from "@/repositories/public-content.repository";
import { getLocalized } from "@/lib/utils/locale-mapper";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default async function BlogPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const blogs = await getPublishedBlogs();
  const tNav = await getTranslations("Navigation");

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-clinic-offwhite py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest">
            {tNav("blog")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, health tips, and educational articles on homeopathic wellness.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const title = getLocalized(blog, "title", locale);
            const excerpt = getLocalized(blog, "excerpt", locale);
            const categoryName = blog.blog_categories ? getLocalized(blog.blog_categories, "name", locale) : "Health";
            const date = new Date(blog.published_at || blog.created_at).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            // Fallback image if none provided
            const imageUrl = blog.featured_image_url || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800";

            return (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={imageUrl} 
                    alt={title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 start-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-clinic-forest">
                    {categoryName}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-clinic-charcoal mb-3 group-hover:text-clinic-sage transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {excerpt}
                  </p>
                  <span className="text-sm font-medium text-clinic-forest group-hover:underline">Read Article &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}