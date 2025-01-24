import { Metadata } from "next"
import { notFound } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { TestDetails } from "./components/TestDetails"
import { getPublicTest } from "@/lib/tests"

export const metadata: Metadata = {
  title: "Test Details",
  description: "View test details and start assessment"
}

interface PageProps {
  params: Promise<{
    testId: string
  }>
}

export default async function TestPage({ params }: PageProps) {
  const user = await currentUser()
  const isAuthenticated = !!user
  
  // Await the params first
  const resolvedParams = await params;

  if (!resolvedParams?.testId) {
    notFound();
  }

  try {
    const response = await getPublicTest(resolvedParams.testId);
    
    if (!response?.test) {
      notFound();
    }

    return (
      <div className="container py-8 space-y-8">
        <TestDetails 
          test={response.test} 
          attempts={response.attempts}
          isAuthenticated={isAuthenticated} // Passed down to StartTestButton
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching test:', error);
    notFound();
  }
}