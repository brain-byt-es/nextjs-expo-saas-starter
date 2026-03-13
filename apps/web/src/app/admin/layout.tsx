"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Better-Auth admin plugin adds 'role' to user but types need explicit cast
interface SessionUser {
  role?: string
  [key: string]: unknown
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const user = session?.user as SessionUser | undefined

  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) {
      router.replace("/dashboard")
    }
  }, [user, isPending, router])

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <nav className="flex gap-4 text-sm">
              <a href="/admin" className="text-muted-foreground hover:text-foreground">
                Overview
              </a>
              <a href="/admin/users" className="text-muted-foreground hover:text-foreground">
                Users
              </a>
            </nav>
          </div>
          <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Dashboard
          </a>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
