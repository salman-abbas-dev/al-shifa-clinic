import { getAdminAppointments } from "@/repositories/admin.repository"
import { AppointmentsTable } from "@/components/admin/appointments-table"

export default async function AdminAppointmentsPage() {
  const appointments = await getAdminAppointments()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-clinic-forest">Appointment Management</h1>
        <p className="text-muted-foreground mt-2">View and manage all patient booking requests.</p>
      </div>

      <AppointmentsTable initialData={appointments} />
    </div>
  )
}