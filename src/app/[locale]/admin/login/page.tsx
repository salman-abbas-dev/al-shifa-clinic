"use client"

import { useState } from "react"
import { useRouter } from "@/i18n/routing"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Stethoscope, Loader2, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    // Verify Admin Role in profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    if (profile?.role !== "admin") {
      await supabase.auth.signOut()
      setError("Access denied. Administrator privileges required.")
      setIsLoading(false)
      return
    }

    router.push("/admin/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-clinic-offwhite flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-border shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-clinic-forest rounded-2xl flex items-center justify-center mb-4">
            <Stethoscope className="h-8 w-8 text-clinic-gold" />
          </div>
          <h1 className="text-2xl font-bold text-clinic-forest">Al Shifa Admin</h1>
          <p className="text-muted-foreground text-sm">Secure Portal Login</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-clinic-charcoal mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-clinic-forest outline-none"
            />
          </div>
          
          <Button type="submit" className="w-full mt-4" size="lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  )
}