"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, ContactFormValues } from "@/lib/validations/contact"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setIsSuccess(true)
      reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError("An unexpected error occurred.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
      <h3 className="text-2xl font-bold text-clinic-forest mb-6">Send Us a Message</h3>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-clinic-sage/20 border border-clinic-sage text-clinic-forest text-sm flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-clinic-forest" />
          <span>Your message has been sent successfully. We will get back to you shortly.</span>
        </div>
      )}

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-clinic-charcoal mb-1">
            Your Name *
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Muhammad Ali"
            className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">
              Phone Number *
            </label>
            <input
              {...register("phone")}
              placeholder="03001234567"
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none"
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">
              Email Address (Optional)
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-clinic-charcoal mb-1">
            Subject *
          </label>
          <input
            {...register("subject")}
            placeholder="e.g. Consultation Inquiry"
            className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none"
          />
          {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-clinic-charcoal mb-1">
            Message *
          </label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest focus:outline-none"
          />
          {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending Message...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}