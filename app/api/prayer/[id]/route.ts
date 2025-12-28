import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/prayer/[id]
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  const prayer = await prisma.prayer.findUnique({
    where: { id },
  });

  if (!prayer) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(prayer);
}

// PUT /api/prayer/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  const body = await req.json();

  const updated = await prisma.prayer.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(updated);
}
