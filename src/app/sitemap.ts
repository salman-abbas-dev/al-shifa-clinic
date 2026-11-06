import { MetadataRoute } from 'next'
import { getPublishedBlogs, getPublishedSpecialities, getPublishedSuccessStories } from '@/repositories/public-content.repository'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const locales = ['en', 'ur']

  // Core static routes
  const staticRoutes = ['', '/about', '/specialities', '/blog', '/success-stories', '/contact', '/book-appointment']
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add Static Routes for each locale
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      })
    })
  })

  // Fetch dynamic content
  const [blogs, specialities, stories] = await Promise.all([
    getPublishedBlogs(),
    getPublishedSpecialities(),
    getPublishedSuccessStories()
  ])

  // Map dynamic routes
  locales.forEach((locale) => {
    blogs.forEach((blog) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })

    specialities.forEach((spec) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/specialities/${spec.slug}`,
        lastModified: new Date(spec.updated_at || spec.created_at),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })

    stories.forEach((story) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/success-stories/${story.slug}`,
        lastModified: new Date(story.updated_at || story.created_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  return sitemapEntries
}