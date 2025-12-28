// import { NextResponse } from 'next/server';

// export async function GET() {
//   return NextResponse.json([
//     { id: 1, name: "Edwin" },
//     { id: 2, name: "John" }
//   ]);
// }

// export async function POST(request: Request) {
//   const body = await request.json();
//   return NextResponse.json(
//     { message: "User created", user: body },
//     { status: 201 }
//   );
// }
import {prisma }from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
