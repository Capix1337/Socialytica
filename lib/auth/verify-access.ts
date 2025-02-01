// lib/auth/verify-access.ts
import prisma from "@/lib/prisma";

export async function verifyTestAccess(
  userId: string,
  testAttemptId: string
): Promise<boolean> {
  try {
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: testAttemptId,
        user: {
          clerkUserId: userId
        }
      }
    });

    return !!attempt;
  } catch (error) {
    console.error("[VERIFY_TEST_ACCESS]", error);
    return false;
  }
}