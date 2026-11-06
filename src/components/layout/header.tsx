"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X, Stethoscope } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const t = useTranslations("Navigation")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/specialities", label: t("specialities") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Stethoscope className="h-8 w-8 text-clinic-forest" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-clinic-forest leading-none">
              Al Shifa
            </span>
            <span className="text-xs font-medium text-clinic-sage tracking-wider uppercase leading-none mt-1">
              Homeopathic Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-clinic-charcoal hover:text-clinic-sage transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild>
            <Link href="/book-appointment">{t("book_appointment")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-clinic-forest"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t bg-white"
          >
            <nav className="flex flex-col px-4 py-4 space-y-4 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-clinic-charcoal p-2 rounded hover:bg-clinic-offwhite transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <Button asChild className="w-full">
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/book-appointment">
                    {t("book_appointment")}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}