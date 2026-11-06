import { getClinicSettings } from "@/repositories/public-content.repository"
import { getLocalized } from "@/lib/utils/locale-mapper"
import { ContactForm } from "@/components/contact/contact-form"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const settings = await getClinicSettings()
  const tNav = await getTranslations("Navigation")

  const address = getLocalized(settings, "address", locale) || "123 Health Avenue, Sargodha, Punjab, Pakistan"
  const hours = getLocalized(settings, "working_hours", locale) || "Mon - Sat: 10:00 AM - 8:00 PM"
  const phone = settings?.phone || "+92 300 1234567"
  const whatsapp = settings?.whatsapp || "+92 300 1234567"
  const email = settings?.email || "contact@alshifaclinic.com"

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest">
            {tNav("contact")}
          </h1>
          <p className="text-lg text-muted-foreground">
            We are here to answer your questions and help you schedule your consultation in Sargodha.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Details Side */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="bg-clinic-offwhite p-8 rounded-3xl border border-border space-y-6">
              <h3 className="text-2xl font-bold text-clinic-forest">Clinic Information</h3>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-clinic-sage/20 rounded-xl flex items-center justify-center text-clinic-forest shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Location</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-clinic-sage/20 rounded-xl flex items-center justify-center text-clinic-forest shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Working Hours</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-clinic-sage/20 rounded-xl flex items-center justify-center text-clinic-forest shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Phone</h4>
                  <p className="text-sm text-muted-foreground mt-1" dir="ltr">{phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-clinic-sage/20 rounded-xl flex items-center justify-center text-clinic-forest shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground mt-1" dir="ltr">{whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-clinic-sage/20 rounded-xl flex items-center justify-center text-clinic-forest shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-clinic-charcoal">Email</h4>
                  <p className="text-sm text-muted-foreground mt-1">{email}</p>
                </div>
              </div>
            </div>

            {/* Location Map Container */}
            <div className="bg-clinic-offwhite rounded-3xl overflow-hidden border border-border h-64 relative flex items-center justify-center">
              <iframe
                title="Al Shifa Clinic Sargodha Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108848.484218357!2d72.63720745000001!3d32.083610950000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3923970b80985c57%3A0xbdf73318b8744549!2sSargodha%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}