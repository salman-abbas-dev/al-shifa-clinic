import { HeroSection } from "@/components/home/hero-section"
import { JsonLd } from "@/components/seo/json-ld"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const tNav = useTranslations("Navigation")
  const tHero = useTranslations("Hero")
  
  // Local SEO Structured Data for Google Maps and Rich Results
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician"],
    "name": "Al Shifa Homeopathic Clinic",
    "doctor": {
      "@type": "Person",
      "name": "Dr. Ahmed Ali",
      "jobTitle": "Homeopathic Physician"
    },
    "description": tHero("description"),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sargodha",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "medicalSpecialty": "Homeopathy",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }

  return (
    <div className="flex flex-col w-full">
      <JsonLd data={clinicSchema} />
      <HeroSection />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg border border-border">
              <Image 
                src="https://images.unsplash.com/photo-1612349317150-e410f624c427?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Ahmed Ali - Professional Portrait"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-clinic-forest">
                {tNav("about")}
              </h2>
              <h3 className="text-xl font-medium text-clinic-charcoal">
                Dr. Ahmed Ali (DHMS)
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 15 years of dedicated practice in Sargodha, Dr. Ahmed Ali brings a compassionate, highly individualized approach to homeopathic medicine. He believes in treating the whole person rather than just suppressing symptoms, focusing heavily on a patient&apos;s complete medical history and overall well-being.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline">
                  <Link href="/about">Read Full Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}