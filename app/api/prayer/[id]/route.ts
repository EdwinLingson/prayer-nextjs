import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/prayer/[id]
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // params might be a promise
) {
    const paramsResolved = await context.params; // ✅ await if promise
    const { id } = paramsResolved;
    console.log(id)

    if (!id) {
        return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
    }

    const prayer = await prisma.prayer.findUnique({ where: { id } });
    console.log(prayer)

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

// DELETE /api/prayer/[id]
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.prayer.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete prayer' },
            { status: 500 }
        );
    }
}
