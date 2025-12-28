import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/prayer/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params might be a promise
) {
  const paramsResolved = await context.params; // ✅ await if promise
  const { id } = paramsResolved;

  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  const prayer = await prisma.prayer.findUnique({ where: { id } });

  if (!prayer) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(prayer);
}

// PUT /api/prayer/[id]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const paramsResolved = await context.params;
  const { id } = paramsResolved;

  if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });

  const body = await req.json();

  try {
    const updatedPrayer = await prisma.prayer.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedPrayer);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to update prayer' }, { status: 500 });
  }
}
