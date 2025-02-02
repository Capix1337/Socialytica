// components/test/Analysis.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import type { TestAnalysisResponse } from "@/types/test-analysis";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/hooks/use-analysis";

interface AnalysisProps {
  attemptId: string;
  className?: string;
  initialData?: TestAnalysisResponse;
}

export function Analysis({ attemptId, className, initialData }: AnalysisProps) {
  const { 
    analysis, 
    isLoading, 
    error, 
    generateAnalysis, 
    retry 
  } = useAnalysis(attemptId, initialData);

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          {!analysis && (
            <Button 
              onClick={generateAnalysis}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Analysis...
                </>
              ) : (
                "Generate Analysis"
              )}
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-destructive/10 p-4 rounded-md space-y-2">
            <p className="text-sm text-destructive">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={retry}
              className="w-full"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        )}

        {analysis?.data && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Analysis</h3>
              <p className="text-muted-foreground">{analysis.data.analysis}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Advice</h3>
              <p className="text-muted-foreground">{analysis.data.advice}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}