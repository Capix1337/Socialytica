//app/(test-taking)/tests/[slug]/components/CategoryList.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Category } from "@/types/tests/category"

interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Categories</h2>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-muted-foreground">{category.description}</p>
              )}
              <p className="text-sm mt-2">
                Questions: {category._count?.questions || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}