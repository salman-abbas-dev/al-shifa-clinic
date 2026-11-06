import { getClinicSettings } from "@/repositories/public-content.repository"
import { AppointmentForm } from "@/components/appointments/appointment-form"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function BookAppointmentPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string }>
}) {
  const { locale } = await params
  const { type } = await searchParams
  setRequestLocale(locale)

  const settings = await getClinicSettings()
  const tNav = await getTranslations("Navigation")

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest">
            {tNav("book_appointment")}
          </h1>
          <p className="text-lg text-muted-foreground">
            Take the first step towards personalized homeopathic care with Dr. Ahmed Ali.
          </p>
        </div>

        <AppointmentForm 
          initialConsultationType={type || "General Homeopathic Consultation"}
          marhamUrl={settings?.marham_url || "https://www.marham.pk"}
          clinicWhatsapp={settings?.whatsapp || "+923001234567"}
        />
      </div>
    </div>
  )
}