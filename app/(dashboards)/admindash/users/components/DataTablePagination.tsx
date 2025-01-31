import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}