import prisma from "@/lib/prisma";

export async function verifyTestAccess(
  clerkUserId: string, 
  testAttemptId: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true }
  });

  if (!user) return false;

  const attempt = await prisma.testAttempt.findFirst({
    where: {
      id: testAttemptId,
      userId: user.id
    }
  });

  return !!attempt;
}