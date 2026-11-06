import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Stethoscope, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const t = useTranslations("Navigation")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-clinic-forest text-white/90 py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand & Description */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-clinic-gold" />
            <span className="text-2xl font-bold text-white tracking-tight">Al Shifa</span>
          </div>
          <p className="text-sm leading-relaxed text-clinic-offwhite/80 max-w-xs">
            A personalized approach to homeopathic consultation, dedicated to your holistic well-being and health journey in Sargodha.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <nav className="flex flex-col space-y-3 text-sm">
            <Link href="/" className="hover:text-clinic-gold transition-colors">{t("home")}</Link>
            <Link href="/about" className="hover:text-clinic-gold transition-colors">{t("about")}</Link>
            <Link href="/specialities" className="hover:text-clinic-gold transition-colors">{t("specialities")}</Link>
            <Link href="/blog" className="hover:text-clinic-gold transition-colors">{t("blog")}</Link>
            <Link href="/contact" className="hover:text-clinic-gold transition-colors">{t("contact")}</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <div className="flex flex-col space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-clinic-gold shrink-0" />
              <span>123 Health Avenue, Sargodha, Punjab, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-clinic-gold shrink-0" />
              <span dir="ltr">+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-clinic-gold shrink-0" />
              <span>contact@alshifaclinic.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/20 text-xs text-center text-clinic-offwhite/60">
        <p>&copy; {currentYear} Al Shifa Homeopathic Clinic. All rights reserved.</p>
        <p className="mt-2">Medical Disclaimer: The information provided on this website is for educational purposes only and does not substitute for professional medical advice or emergency treatment.</p>
      </div>
    </footer>
  )
}