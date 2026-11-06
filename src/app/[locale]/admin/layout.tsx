import { redirect } from "@/i18n/routing"
import { createClient } from "@/lib/supabase/server"
import { Link } from "@/i18n/routing"
import { 
  LayoutDashboard, CalendarCheck, FileText, Settings, 
  Users, Stethoscope, LogOut, HeartPulse 
} from "lucide-react"

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  
  // 1. Authenticate user safely
  const { data: { session } } = await supabase.auth.getSession()
  const userId = session?.user?.id
  
  if (!userId) {
    redirect({ href: "/admin/login", locale })
  }

  // 2. Authorize role using the strictly checked userId
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single()

  if (profile?.role !== "admin") {
    redirect({ href: "/admin/login", locale })
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
    { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
    { href: "/admin/specialities", label: "Specialities", icon: HeartPulse },
    { href: "/admin/testimonials", label: "Testimonials", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-clinic-offwhite flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-clinic-forest text-white flex flex-col shrink-0">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10">
          <Stethoscope className="h-8 w-8 text-clinic-gold" />
          <span className="font-bold text-xl tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          {/* We will handle signout via a client component or server action in production, 
              but for layout styling this structure is maintained */}
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-300 hover:bg-red-500/20 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-bold text-clinic-charcoal">Dashboard</h2>
          <div className="text-sm font-medium text-muted-foreground bg-clinic-offwhite px-4 py-2 rounded-full border border-border">
            Logged in as Admin
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}