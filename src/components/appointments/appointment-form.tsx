"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentSchema, AppointmentFormValues } from "@/lib/validations/appointment"
import { Button } from "@/components/ui/button"
import { 
  Calendar, Clock, User, Phone, Mail, MessageSquare, 
  ExternalLink, CheckCircle2, AlertCircle, Loader2, ShieldCheck
} from "lucide-react"

interface AppointmentFormProps {
  initialConsultationType?: string
  marhamUrl?: string
  clinicWhatsapp?: string
}

export function AppointmentForm({ 
  initialConsultationType = "General Homeopathic Consultation",
  marhamUrl = "https://www.marham.pk",
  clinicWhatsapp = "+923001234567"
}: AppointmentFormProps) {
  const [bookingMode, setBookingMode] = useState<"website" | "marham">("website")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{
    reference_code: string
    appointment_date: string
    appointment_time: string
  } | null>(null)

  // Get minimum date (Today) in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patient_name: "",
      phone: "",
      whatsapp: "",
      email: "",
      consultation_type: initialConsultationType,
      appointment_date: today,
      appointment_time: "10:00",
      gender: "Male",
      reason: "",
    },
  })

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to book appointment")
      }

      setSuccessData(result.data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirmation view after booking
  if (successData) {
    const cleanWhatsapp = clinicWhatsapp.replace(/[^0-9]/g, "")
    const whatsappMessage = encodeURIComponent(
      `Hello Al Shifa Clinic, I have requested an appointment.\nReference: ${successData.reference_code}\nDate: ${successData.appointment_date}\nTime: ${successData.appointment_time}`
    )
    const whatsappLink = `https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-md text-center max-w-2xl mx-auto space-y-6">
        <div className="h-16 w-16 bg-clinic-forest/10 text-clinic-forest rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10 text-clinic-forest" />
        </div>
        
        <h2 className="text-3xl font-bold text-clinic-forest">Appointment Requested!</h2>
        <p className="text-muted-foreground text-lg">
          Your booking request has been stored in our system and is currently pending administrator confirmation.
        </p>

        <div className="bg-clinic-offwhite p-6 rounded-2xl border border-border text-start space-y-3">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="font-medium text-muted-foreground">Reference Code:</span>
            <span className="font-bold text-clinic-forest">{successData.reference_code}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="font-medium text-muted-foreground">Preferred Date:</span>
            <span className="font-semibold text-clinic-charcoal">{successData.appointment_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Preferred Time:</span>
            <span className="font-semibold text-clinic-charcoal">{successData.appointment_time}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Confirm via WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setSuccessData(null)}>
            Book Another Appointment
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-border shadow-sm max-w-3xl mx-auto">
      {/* Booking Mode Selector */}
      <div className="grid grid-cols-2 gap-3 p-1.5 bg-clinic-offwhite rounded-2xl mb-8 border border-border">
        <button
          type="button"
          onClick={() => setBookingMode("website")}
          className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            bookingMode === "website"
              ? "bg-clinic-forest text-white shadow-sm"
              : "text-clinic-charcoal hover:text-clinic-forest"
          }`}
        >
          Book via Website
        </button>
        <button
          type="button"
          onClick={() => setBookingMode("marham")}
          className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            bookingMode === "marham"
              ? "bg-clinic-forest text-white shadow-sm"
              : "text-clinic-charcoal hover:text-clinic-forest"
          }`}
        >
          Book via Marham.pk
        </button>
      </div>

      {/* Option 2: Marham Booking Box */}
      {bookingMode === "marham" ? (
        <div className="text-center py-10 px-4 space-y-6">
          <div className="h-16 w-16 bg-clinic-sage/20 text-clinic-forest rounded-full flex items-center justify-center mx-auto">
            <ExternalLink className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-clinic-forest">Marham Online Consultation</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Dr. Ahmed Ali is registered on Marham.pk. You can view official available time slots and book directly through Marham&apos;s verified platform.
          </p>
          <Button asChild size="lg" className="mt-4">
            <a href={marhamUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <span>Go to Marham Profile</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      ) : (
        /* Option 1: Direct Website Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {serverError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal flex items-center gap-2">
                <User className="h-4 w-4 text-clinic-sage" />
                Full Name *
              </label>
              <input
                {...register("patient_name")}
                placeholder="e.g. Muhammad Usman"
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none transition-all"
              />
              {errors.patient_name && (
                <p className="text-xs text-destructive">{errors.patient_name.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal flex items-center gap-2">
                <Phone className="h-4 w-4 text-clinic-sage" />
                Phone Number *
              </label>
              <input
                {...register("phone")}
                placeholder="03001234567"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none transition-all"
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-clinic-sage" />
                WhatsApp Number (Optional)
              </label>
              <input
                {...register("whatsapp")}
                placeholder="03001234567"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none transition-all"
              />
              {errors.whatsapp && (
                <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal flex items-center gap-2">
                <Mail className="h-4 w-4 text-clinic-sage" />
                Email Address (Optional)
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="patient@example.com"
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none transition-all"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal">Age</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                placeholder="e.g. 35"
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none transition-all"
              />
              {errors.age && (
                <p className="text-xs text-destructive">{errors.age.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal">Gender</label>
              <select
                {...register("gender")}
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none bg-white transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Consultation Type */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-clinic-charcoal">Consultation Category *</label>
              <select
                {...register("consultation_type")}
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none bg-white transition-all"
              >
                <option value="General Homeopathic Consultation">General Homeopathic Consultation</option>
                <option value="Digestive Health">Digestive Health</option>
                <option value="Skin & Hair Concerns">Skin & Hair Concerns</option>
                <option value="Joint & Musculoskeletal Pain">Joint & Musculoskeletal Pain</option>
                <option value="Respiratory & Allergic Conditions">Respiratory & Allergic Conditions</option>
                <option value="Headaches & Migraine">Headaches & Migraine</option>
              </select>
              {errors.consultation_type && (
                <p className="text-xs text-destructive">{errors.consultation_type.message}</p>
              )}
            </div>

            {/* Preferred Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal flex items-center gap-2">
                <Calendar className="h-4 w-4 text-clinic-sage" />
                Preferred Date *
              </label>
              <input
                {...register("appointment_date")}
                type="date"
                min={today}
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none bg-white transition-all"
              />
              {errors.appointment_date && (
                <p className="text-xs text-destructive">{errors.appointment_date.message}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-clinic-charcoal flex items-center gap-2">
                <Clock className="h-4 w-4 text-clinic-sage" />
                Preferred Time Slot *
              </label>
              <select
                {...register("appointment_time")}
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none bg-white transition-all"
              >
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="19:00">07:00 PM</option>
              </select>
              {errors.appointment_time && (
                <p className="text-xs text-destructive">{errors.appointment_time.message}</p>
              )}
            </div>

            {/* Brief Reason */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-clinic-charcoal">
                Brief Reason for Consultation
              </label>
              <textarea
                {...register("reason")}
                rows={3}
                placeholder="Describe your health concerns or main symptoms..."
                className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none transition-all"
              />
              {errors.reason && (
                <p className="text-xs text-destructive">{errors.reason.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-clinic-sage shrink-0" />
            <span>Your personal data is handled confidentially and used solely for medical consultation scheduling.</span>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting Request...
              </span>
            ) : (
              "Submit Appointment Request"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}