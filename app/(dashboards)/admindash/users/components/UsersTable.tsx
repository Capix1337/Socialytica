"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { UserListItem } from "@/types/admin/users"
import Link from "next/link"
import { DataTablePagination } from "./DataTablePagination"

interface UsersTableProps {
  users: UserListItem[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type UserTableValue = string | number | null | undefined

const columns: ColumnDef<UserListItem, UserTableValue>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.imageUrl || ""} />
            <AvatarFallback>
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link 
              href={`/admindash/users/${user.id}`}
              className="font-medium hover:underline"
            >
              {user.firstName} {user.lastName}
            </Link>
            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const country = row.getValue("country") as string | null
      return country ? (
        <Badge variant="secondary">{country}</Badge>
      ) : (
        <span className="text-muted-foreground">Not set</span>
      )
    }
  },
  {
    accessorKey: "totalTests",
    header: "Tests Taken"
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string)
      return date.toLocaleDateString()
    }
  }
]

export function UsersTable({ 
  users, 
  loading,
  currentPage,
  totalPages,
  onPageChange 
}: UsersTableProps) {
  return (
    <div className="space-y-4">
      <DataTable<UserListItem, UserTableValue>
        columns={columns}
        data={users}
        isLoading={loading}
        searchKey="email" // Add this line - specify which field to search by
      />
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}