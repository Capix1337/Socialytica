import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const form = await req.formData()
    const file = form.get('file') as File
    
    if (!file) {
      return new NextResponse('No file provided', { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new NextResponse('Invalid file type', { status: 400 })
    }

    // Generate unique filename
    const uniqueId = nanoid()
    const ext = file.name.split('.').pop()
    const filename = `${uniqueId}.${ext}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type
    })

    return NextResponse.json({ url: blob.url })

  } catch (error) {
    console.error('[IMAGE_UPLOAD]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}