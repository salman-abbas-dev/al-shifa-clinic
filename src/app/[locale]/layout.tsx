import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Hero' })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Al Shifa Homeopathic Clinic',
      default: 'Al Shifa Homeopathic Clinic | Dr. Ahmed Ali in Sargodha',
    },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ur: '/ur',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ur' ? 'ur_PK' : 'en_PK',
      url: `/${locale}`,
      siteName: 'Al Shifa Homeopathic Clinic',
      title: 'Al Shifa Homeopathic Clinic | Sargodha',
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Enable static rendering
  setRequestLocale(locale)

  // Load translations
  const messages = await getMessages()

  // Determine text direction for RTL support (Urdu)
  const direction = locale === 'ur' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={direction}>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}