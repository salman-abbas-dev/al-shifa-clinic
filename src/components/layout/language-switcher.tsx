"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    const nextLocale = locale === "en" ? "ur" : "en"
    // Replace the current path with the new locale to preserve page state
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={switchLanguage}
      className="flex items-center gap-2 font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === 'en' ? 'اردو' : 'English'}</span>
    </Button>
  )
}