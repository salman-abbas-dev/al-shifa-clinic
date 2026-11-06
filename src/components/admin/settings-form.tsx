"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Database } from "@/types/database.types"
import { Button } from "@/components/ui/button"
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react"

type ClinicSettings = Database["public"]["Tables"]["clinic_settings"]["Row"]

export function SettingsForm({ initialData }: { initialData: ClinicSettings | null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    clinic_name_en: initialData?.clinic_name_en || "",
    clinic_name_ur: initialData?.clinic_name_ur || "",
    phone: initialData?.phone || "",
    whatsapp: initialData?.whatsapp || "",
    email: initialData?.email || "",
    marham_url: initialData?.marham_url || "",
    address_en: initialData?.address_en || "",
    address_ur: initialData?.address_ur || "",
    working_hours_en: initialData?.working_hours_en || "",
    working_hours_ur: initialData?.working_hours_ur || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || "Failed to update settings.")

      setMessage({ type: "success", text: result.message })
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: "error", text: error.message })
      } else {
        setMessage({ type: "error", text: "An unexpected error occurred." })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-8">
      
      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${message.type === "success" ? "bg-clinic-sage/20 text-clinic-forest border border-clinic-sage" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
          {message.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-clinic-forest border-b border-border pb-2">General & Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Clinic Name (English)</label>
            <input name="clinic_name_en" value={formData.clinic_name_en} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" required />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Clinic Name (Urdu)</label>
            <input name="clinic_name_ur" value={formData.clinic_name_ur} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none font-urdu" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} dir="ltr" className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">WhatsApp Number</label>
            <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} dir="ltr" className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Email Address</label>
            <input name="email" value={formData.email} onChange={handleChange} dir="ltr" className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Marham Profile URL</label>
            <input name="marham_url" value={formData.marham_url} onChange={handleChange} dir="ltr" className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" />
            <p className="text-xs text-muted-foreground mt-1">This updates the Marham booking link across the website.</p>
          </div>
        </div>
      </div>

      {/* Address & Hours */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-clinic-forest border-b border-border pb-2">Localization: Address & Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Address (English)</label>
            <textarea name="address_en" value={formData.address_en} onChange={handleChange} rows={3} className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" required />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Address (Urdu)</label>
            <textarea name="address_ur" value={formData.address_ur} onChange={handleChange} rows={3} className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none font-urdu" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Working Hours (English)</label>
            <input name="working_hours_en" value={formData.working_hours_en} onChange={handleChange} placeholder="Mon-Sat: 10AM - 8PM" className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none" required />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Working Hours (Urdu)</label>
            <input name="working_hours_ur" value={formData.working_hours_ur} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-clinic-forest outline-none font-urdu" required />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Settings
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}