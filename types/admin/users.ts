import type { 
  User as PrismaUser, 
  UserProfile as DBUserProfile,
  TestAttempt
} from "@prisma/client"

export interface UserListResponse {
  users: UserListItem[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
}

export interface UserListItem {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  country: string | null;
  totalTests: number;
  createdAt: Date;
}

export type UserWithRelations = PrismaUser & {
  profile: DBUserProfile | null;
  testAttempts: TestAttempt[];
}

export interface UserDetailsResponse {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  profile: DBUserProfile | null;
  stats: UserTestStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTestStats {
  totalTests: number;
  averageScore: number;
  testsHistory: TestHistoryItem[];
}

export interface TestHistoryItem {
  testId: string;
  testTitle: string;
  completedAt: Date | null;
  score: number | null;
  categoryScores: CategoryScore[];
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
}