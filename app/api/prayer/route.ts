import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/prayer -> list all prayers
export async function GET(req: NextRequest) {
  try {
    const prayers = await prisma.prayer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(prayers);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch prayers' }, { status: 500 });
  }
}

// POST /api/prayer -> create new prayer
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Auto-generate primary key (example: date + random suffix)
    const id = `${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 1000)}`;

    const newPrayer = await prisma.prayer.create({
      data: { id, ...body },
    });

    return NextResponse.json(newPrayer);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create prayer' }, { status: 500 });
  }
}
