import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/prayer/by-date?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const date = url.searchParams.get('date');

  if (!date) return NextResponse.json({ message: 'Missing date' }, { status: 400 });

  try {
    const prayers = await prisma.prayer.findMany({
      where: {
        createdAt: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lte: new Date(`${date}T23:59:59.999Z`),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(prayers);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch prayers' }, { status: 500 });
  }
}
