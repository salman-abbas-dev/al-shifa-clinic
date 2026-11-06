"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Database } from "@/types/database.types"
import { Loader2 } from "lucide-react"

type Appointment = Database["public"]["Tables"]["appointments"]["Row"]

export function AppointmentsTable({ initialData }: { initialData: Appointment[] }) {
  const [appointments, setAppointments] = useState(initialData)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) throw new Error("Failed to update status")

      // Update local state
      setAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status: newStatus as Appointment["status"] } : app)
      )
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update appointment status.")
    } finally {
      setLoadingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-amber-100 text-amber-800 border-amber-200"
      case "confirmed": return "bg-green-100 text-green-800 border-green-200"
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-clinic-offwhite text-clinic-charcoal font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">Patient / Code</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Consultation Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-end">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((app) => (
              <tr key={app.id} className="hover:bg-clinic-offwhite/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-clinic-charcoal">{app.patient_name}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{app.reference_code}</div>
                </td>
                <td className="px-6 py-4" dir="ltr">
                  <div>{app.phone}</div>
                  {app.whatsapp && <div className="text-xs text-green-600 mt-1">WA: {app.whatsapp}</div>}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{app.appointment_date}</div>
                  <div className="text-muted-foreground">{app.appointment_time}</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{app.consultation_type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                    {app.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-end">
                  {loadingId === app.id ? (
                    <Loader2 className="h-5 w-5 animate-spin ms-auto text-clinic-forest" />
                  ) : (
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="text-sm border border-input rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-clinic-forest cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="completed">Complete</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No appointments found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}