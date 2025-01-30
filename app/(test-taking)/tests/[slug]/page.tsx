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
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { test } = await getPublicTest(resolvedParams.slug)
  
  if (!test) {
    return { 
      title: 'Test Not Found',
      description: 'The requested test could not be found'
    }
  }

  return { 
    title: test.title,
    description: test.description || 'Take this assessment test'
  }
}

export default async function TestPage({ params }: PageProps) {
  const resolvedParams = await params
  const user = await currentUser()
  const isAuthenticated = !!user

  try {
    const { test, attempts } = await getPublicTest(resolvedParams.slug)
    if (!test) notFound()
    
    return (
      <div className="container py-8 space-y-8">
        <TestDetails 
          test={test} 
          attempts={attempts}
          isAuthenticated={isAuthenticated}
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching test:', error)
    notFound()
  }
}