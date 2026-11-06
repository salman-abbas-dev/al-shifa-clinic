import { getClinicSettings } from "@/repositories/public-content.repository"
import { SettingsForm } from "@/components/admin/settings-form"

export default async function AdminSettingsPage() {
  const settings = await getClinicSettings()

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-clinic-forest">Clinic Settings</h1>
        <p className="text-muted-foreground mt-2">Manage global contact information, localizations, and external integrations.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  )
}