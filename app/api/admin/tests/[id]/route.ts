// app/api/admin/tests/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateTestSchema } from "@/lib/validations/test";
import { Question } from "@prisma/client";


// GET /api/admin/tests/[id] - Get a specific test
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const test = await prisma.test.findUnique({
      where: {
        id: params.id
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!test) {
      return new NextResponse("Test not found", { status: 404 });
    }

    return NextResponse.json(test);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH /api/admin/tests/[id] - Update a test
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    const id = params.id;
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = updateTestSchema.parse(json);

    // Delete existing questions
    await prisma.question.deleteMany({
      where: { testId: id }
    });

    // Update test with new questions
    const test = await prisma.test.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        isPublished: body.isPublished,
        questions: {
          create: body.questions?.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options,
            order: q.order
          }))
        }
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(test);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE /api/admin/tests/[id] - Delete a test
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.test.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST /api/admin/tests/[id]/questions - Add questions to a test
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { text, type, options, order } = json;

    const question = await prisma.question.create({
      data: {
        text,
        type,
        options,
        order,
        testId: params.id
      }
    });

    return NextResponse.json(question);
  } catch (err) {
    console.error('Error creating question:', err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PUT /api/admin/tests/[id]/questions - Update question order
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata?.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { questions } = json;

    // Verify questions belong to the correct test
    const updates = questions.map((question: Question) =>
      prisma.question.update({
        where: { 
          id: question.id,
          testId: params.id
        },
        data: { order: question.order }
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating questions:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}