// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/AuthOverlay.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"

interface AuthOverlayProps {
  testName: string;
}

export function AuthOverlay({ testName }: AuthOverlayProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-background/80">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-2xl">View Your Results</CardTitle>
          <CardDescription>
            Sign in to view your detailed results for {testName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Your results are saved and will be available immediately after signing in.
          </p>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <Button size="lg">
                Sign in to View Results
              </Button>
            </SignInButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}