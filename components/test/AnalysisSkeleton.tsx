// components/test/AnalysisSkeleton.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}