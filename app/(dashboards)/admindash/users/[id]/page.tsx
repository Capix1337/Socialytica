"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { UserProfile } from "./components/UserProfile"
import { UserStats } from "./components/UserStats"
import type { UserDetailsResponse } from "@/types/admin/users"

export default function UserDetailPage() {
  const params = useParams()
  const [user, setUser] = useState<UserDetailsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        setLoading(true)
        const response = await fetch(`/api/admin/users/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user details')
        }
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user details')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchUserDetails()
    }
  }, [params.id])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-red-500 bg-red-50 p-4 rounded">
          Error: {error}
        </div>
      </div>
    )
  }

  if (!user) {
    return <div className="p-8">User not found</div>
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        User Details
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <UserProfile user={user} />
        <UserStats stats={user.stats} />
      </div>
    </div>
  )
}