interface UsersHeaderProps {
    title: string
    description: string
    totalUsers: number
  }
  
  export function UsersHeader({
    title,
    description,
    totalUsers
  }: UsersHeaderProps) {
    return (
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Users: {totalUsers}
        </div>
      </div>
    )
  }