import { prisma } from '@/lib/db';
import { generatePrayerId } from '@/lib/idGenerator';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const prayer = await prisma.prayer.create({
    data: {
      id: generatePrayerId(),
      intercededFor: body.intercededFor,
      goodWork: body.goodWork,
      badWork: body.badWork,
      goodSpirit: body.goodSpirit,
      badSpirit: body.badSpirit,
      goodFam: body.goodFam,
      badFam: body.badFam,
    },
  });

  return NextResponse.json(prayer);
}

export async function GET() {
  const prayers = await prisma.prayer.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(prayers);
}
