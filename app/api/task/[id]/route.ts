import { taskSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(task);
}

export async function PATCH(request: NextRequest, { params }: Props) {
  // Zod validation
  const body = await request.json();
  const validation = taskSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Check if task exists
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) {
    return NextResponse.json({ error: "Invalid Task" }, { status: 404 });
  }

  // Now update the request
  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
      name: body.name,
      details: body.details,
      status: body.status,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const task = prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task)
    return NextResponse.json({ error: "Invalid Task" }, { status: 404 });

  await prisma.task.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({});
}
