"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/users")
        if (res.ok) {
          const data = await res.json()
          setUsers(data.users || [])
        }
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      })
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      }
    } catch (err) {
      console.error("Failed to update role:", err)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground mt-2">Manage platform users and roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground py-8 text-center">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No users found. Connect your database to see users.
            </p>
          ) : (
            <div className="divide-y">
              {users.map(user => (
                <div key={user.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{user.name || "Unnamed"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                    {user.role === "user" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRoleChange(user.id, "admin")}
                      >
                        Make Admin
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRoleChange(user.id, "user")}
                      >
                        Remove Admin
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
