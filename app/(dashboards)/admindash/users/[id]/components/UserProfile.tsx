import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserDetailsResponse } from "@/types/admin/users"

interface UserProfileProps {
  user: UserDetailsResponse
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.imageUrl || ""} />
            <AvatarFallback className="text-lg">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Personal Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Date of Birth</dt>
                <dd>{user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toLocaleDateString() : 'Not set'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Gender</dt>
                <dd>{user.profile?.gender || 'Not set'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Country</dt>
                <dd>{user.profile?.countryOfOrigin || 'Not set'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Relationship Status</dt>
                <dd>{user.profile?.relationshipStatus || 'Not set'}</dd>
              </div>
            </dl>
          </div>

          {user.profile?.bio && (
            <div>
              <h3 className="font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground">{user.profile.bio}</p>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Account Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Member Since</dt>
                <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Last Updated</dt>
                <dd>{new Date(user.updatedAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}