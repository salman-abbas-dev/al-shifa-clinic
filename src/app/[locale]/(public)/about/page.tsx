import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Award, GraduationCap, Clock, Stethoscope } from "lucide-react"

export default function AboutPage() {
  const tNav = useTranslations("Navigation")

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-clinic-offwhite py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest">{tNav("about")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">Get to know your healthcare partner.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Image & Quick Stats */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-border">
              <Image 
                src="https://images.unsplash.com/photo-1612349317150-e410f624c427?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Ahmed Ali Portrait"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="bg-clinic-offwhite p-6 rounded-xl border border-border space-y-6">
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-clinic-gold" />
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Experience</h4>
                  <p className="text-sm text-muted-foreground">15+ Years</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <GraduationCap className="h-6 w-6 text-clinic-gold" />
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Education</h4>
                  <p className="text-sm text-muted-foreground">DHMS, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-6 w-6 text-clinic-gold" />
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Registration</h4>
                  <p className="text-sm text-muted-foreground">National Council for Homeopathy</p>
                </div>
              </div>
            </div>
            
            <Button asChild className="w-full" size="lg">
              <Link href="/book-appointment">{tNav("book_appointment")}</Link>
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col space-y-10">
            
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-clinic-forest">Professional Profile</h2>
              <p className="text-lg leading-relaxed text-clinic-charcoal">
                Dr. Ahmed Ali is a distinguished homeopathic physician serving the community of Sargodha. With a profound understanding of natural healing principles and over 15 years of clinical experience, he has successfully guided countless patients towards optimal health.
              </p>
              <p className="text-lg leading-relaxed text-clinic-charcoal">
                His practice is built on the foundation of rigorous patient analysis, deeply investigating medical histories, lifestyle factors, and individual genetic predispositions to identify the root cause of ailments rather than merely treating surface-level symptoms.
              </p>
            </section>

            <div className="h-px w-full bg-border" />

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-clinic-forest">Clinical Philosophy</h2>
              <div className="flex gap-4 items-start">
                <Stethoscope className="h-8 w-8 text-clinic-sage shrink-0 mt-1" />
                <p className="text-lg leading-relaxed text-clinic-charcoal italic border-s-4 border-clinic-sage ps-4">
                  &quot;True healing requires understanding the patient as a complete entity. My goal is to stimulate the body&apos;s innate healing mechanisms through carefully selected, highly individualized homeopathic remedies, ensuring safe, gentle, and permanent restoration of health.&quot;
                </p>
              </div>
            </section>

            <div className="h-px w-full bg-border" />

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-clinic-forest">Education & Certifications</h2>
              <ul className="space-y-4 border-s-2 border-clinic-sage ms-2 ps-6">
                <li className="relative">
                  <span className="absolute -start-[31px] top-2 h-3 w-3 rounded-full bg-clinic-gold" />
                  <h3 className="text-xl font-semibold text-clinic-charcoal">Diploma in Homeopathic Medicine & Surgery (DHMS)</h3>
                  <p className="text-muted-foreground">National Council for Homeopathy, Pakistan — 2009</p>
                </li>
                {/* Note: Dynamic certifications from DB will be mapped here in Phase 5 */}
                <li className="relative">
                  <span className="absolute -start-[31px] top-2 h-3 w-3 rounded-full bg-clinic-gold" />
                  <h3 className="text-xl font-semibold text-clinic-charcoal">Advanced Certificate in Dermatological Homeopathy</h3>
                  <p className="text-muted-foreground">Continuous Medical Education (CME) — 2014</p>
                </li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}