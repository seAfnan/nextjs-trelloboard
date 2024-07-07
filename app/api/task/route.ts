import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { taskSchema } from "../../ValidationSchemas";

export async function POST(request: NextRequest) {
  console.log(request);
  const body = await request.json();
  console.log(body);
  const validation = taskSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newTask = await prisma.task.create({
    data: {
      name: body.name,
      details: body.details,
      status: body.status,
    },
  });

  return NextResponse.json(newTask, { status: 201 });
}

export async function GET(request: NextRequest) {
  const tasks = await prisma.task.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(tasks);
}
