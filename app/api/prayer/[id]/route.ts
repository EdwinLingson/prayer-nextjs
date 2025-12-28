import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // singleton Prisma client

// GET /api/prayer/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  const prayer = await prisma.prayer.findUnique({
    where: { id: params.id },
  });

  if (!prayer) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  return NextResponse.json(prayer);
}

// PUT /api/prayer/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  const body = await req.json();

  const updated = await prisma.prayer.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(updated);
}
