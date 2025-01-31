"use client"

import { useState, useEffect } from "react"
import { UsersHeader } from "./components/UsersHeader"
import { UsersTable } from "./components/UsersTable"
import { UsersTableToolbar } from "./components/UsersTableToolbar"
import type { UserListItem } from "@/types/admin/users"

export default function UsersPage() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(10)

  // Filter states
  const [searchValue, setSearchValue] = useState<string>("")
  const [countryFilter, setCountryFilter] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchValue,
        sort: sortOrder,
        ...(countryFilter && { country: countryFilter })
      })

      const response = await fetch(`/api/admin/users?${query}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      
      const data = await response.json()
      setUsers(data.users)
      setTotalUsers(data.totalUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchValue, countryFilter, sortOrder])

  const handleSearch = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const handleCountryFilter = (value: string) => {
    setCountryFilter(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value)
  }

  return (
    <div className="p-4 space-y-6">
      <UsersHeader
        title="Users"
        description="Manage your users from this dashboard."
        totalUsers={totalUsers}
      />

      <UsersTableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearch}
        countryFilter={countryFilter}
        onCountryFilterChange={handleCountryFilter}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded">
          Error: {error}
        </div>
      )}

      <UsersTable
        users={users}
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(totalUsers / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}