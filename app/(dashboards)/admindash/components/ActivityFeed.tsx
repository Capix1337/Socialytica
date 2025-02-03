import { Card } from "@/components/ui/card"
import { Section } from "./Section"
import { Skeleton } from "@/components/ui/skeleton"

interface ActivityFeedProps {
  data: {
    testCompletions: {
      id: string
      userId: string
      testId: string
      completedAt: string
      score: number
      user: {
        firstName: string
        lastName: string
        email: string
      }
      test: {
        title: string
      }
    }[]
    newUsers: {
      id: string
      firstName: string
      lastName: string
      email: string
      createdAt: string
    }[]
    newTests: Array<{
      id: string
      title: string
      isPublished: boolean
      createdAt: string
      user: {
        firstName: string
        lastName: string
      }
    }>
  } | null
  isLoading: boolean
}

export function ActivityFeed({ data, isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <Section title="Recent Activity" description="Latest platform activities">
        <div className="overflow-auto max-h-[400px] pr-2 space-y-4 custom-scrollbar">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </Card>
          ))}
        </div>
      </Section>
    )
  }

  if (!data) {
    return (
      <Section title="Recent Activity" description="Latest platform activities">
        <div className="text-center text-muted-foreground py-6">
          No recent activity
        </div>
      </Section>
    )
  }

  return (
    <Section title="Recent Activity" description="Latest platform activities">
      <div className="overflow-auto max-h-[400px] pr-2 space-y-4 custom-scrollbar">
        {/* Test Completions */}
        {data.testCompletions.map((completion) => (
          <Card 
            key={completion.id} 
            className="p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="font-medium">{completion.test.title}</p>
                <span className="text-sm text-muted-foreground">
                  Score: {completion.score}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Completed by {completion.user.firstName} {completion.user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(completion.completedAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}

        {/* New Users */}
        {data.newUsers.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="space-y-1">
              <p className="font-medium">New User Registered</p>
              <p className="text-sm text-muted-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}

        {/* New Tests */}
        {data.newTests.map((test) => (
          <Card key={test.id} className="p-4">
            <div className="space-y-1">
              <p className="font-medium">New Test Created</p>
              <p className="text-sm text-muted-foreground">
                {test.title}
              </p>
              <p className="text-xs text-muted-foreground">
                by {test.user.firstName} {test.user.lastName} • {new Date(test.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--muted)) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted));
          border-radius: 20px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: hsl(var(--muted-foreground));
        }
      `}</style>
    </Section>
  )
}