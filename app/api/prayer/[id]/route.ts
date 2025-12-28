import { NextResponse } from 'next/server';
import {prisma} from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
    console.log('Fetching prayer with id:', params.id);
  const prayer = await prisma.prayer.findUnique({
    where: { id: params.id },
  });

  if (!prayer) {
    return NextResponse.json(
      { message: 'Prayer not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(prayer);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const updated = await prisma.prayer.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(updated);
}
