import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export { prisma }; // Named export for the Prisma client

export async function POST(req: NextRequest) {
  const body = await req.json();
  const payload = body.rollnumber;

  try {
    const user = await prisma.hostellers.findFirst({
      where: {
        Rollno: payload,
      },
    });

    if (user) {
      const outpass = await prisma.outpass.create({
        data: {
          userId: user.id,
          rollNo: user.Rollno,
          Name: user.Name,
          StartTime: new Date(),
          valid: true,
        },
      });
      return NextResponse.json({ outpass, msg: "OutPass created!" });
    } else {
      return NextResponse.json({ msg: "Hosttler doesn't exist" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error }, { status: 500 });
  }
}
