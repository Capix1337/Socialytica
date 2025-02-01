import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserTestStats } from "@/types/admin/users"

interface UserStatsProps {
  stats: UserTestStats
}

export function UserStats({ stats }: UserStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total Tests</div>
            <div className="text-2xl font-bold">{stats.totalTests}</div>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Average Score</div>
            <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}%</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Test History</h3>
          <div className="space-y-4">
            {stats.testsHistory.map((test) => (
              <div key={test.testId} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{test.testTitle}</h4>
                    <p className="text-sm text-muted-foreground">
                      {test.completedAt ? new Date(test.completedAt).toLocaleDateString() : 'Not completed'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{test.score}%</div>
                  </div>
                </div>

                {test.categoryScores.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium mb-2">Category Scores</h5>
                    <div className="space-y-2">
                      {test.categoryScores.map((score, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{score.category}</span>
                          <span>{((score.score / score.maxScore) * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}