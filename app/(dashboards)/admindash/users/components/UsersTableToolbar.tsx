"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import countries from "world-countries"

interface UsersTableToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  countryFilter: string
  onCountryFilterChange: (value: string) => void
  sortOrder: "asc" | "desc"
  onSortChange: (value: "asc" | "desc") => void
}

// Sort countries by name
const sortedCountries = countries.sort((a, b) => 
  a.name.common.localeCompare(b.name.common)
)

export function UsersTableToolbar({
  searchValue,
  onSearchChange,
  countryFilter,
  onCountryFilterChange,
  sortOrder,
  onSortChange
}: UsersTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <Input
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
        
        <Select
          value={countryFilter}
          onValueChange={onCountryFilterChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {sortedCountries.map((country) => (
              <SelectItem 
                key={country.cca2} 
                value={country.cca2}
              >
                {country.name.common}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={sortOrder}
          onValueChange={(value: "asc" | "desc") => onSortChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}