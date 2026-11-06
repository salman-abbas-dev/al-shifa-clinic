"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  const t = useTranslations("Hero")

  return (
    <section className="relative overflow-hidden bg-clinic-offwhite py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center rounded-full bg-clinic-sage/20 px-3 py-1 text-sm font-semibold text-clinic-forest w-fit">
              {t("label")}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-clinic-charcoal leading-tight">
              {t("heading")}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t("description")}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/book-appointment">{t("btn_book")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/about">{t("btn_explore")}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
              alt="Medical Consultation Environment"
              fill
              className="object-cover"
              priority
            />
            {/* Decorative overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-clinic-forest/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}