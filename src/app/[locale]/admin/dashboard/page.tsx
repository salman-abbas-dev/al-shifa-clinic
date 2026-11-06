import { getDashboardStats } from "@/repositories/admin.repository"
import { CalendarClock, FileText, MessageSquare, CheckCircle2 } from "lucide-react"

export default async function AdminDashboardOverview() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-clinic-forest">Welcome Back, Dr. Ahmed</h1>
        <p className="text-muted-foreground mt-2">Here is what is happening at your clinic today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <CalendarClock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Appointments</p>
            <h3 className="text-2xl font-bold text-clinic-charcoal">{stats.appointments.pending}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
            <h3 className="text-2xl font-bold text-clinic-charcoal">{stats.appointments.total}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Published Blogs</p>
            <h3 className="text-2xl font-bold text-clinic-charcoal">{stats.blogs}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Unread Inquiries</p>
            <h3 className="text-2xl font-bold text-clinic-charcoal">{stats.inquiries}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}