import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export async function POST(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const rollNo = searchParams.get('rollNo')||"";
    const InDate:Date= await req.json()
     try {
        const user = await prisma.hostellers.findFirst({
          where: {
            Rollno: rollNo,
          },
        });
    
        if (user) {
          const outpass = await prisma.homepass.create({
            data: {
              userId: user.id,
              rollNo: user.Rollno,
              Name: user.Name,
              StartTime: new Date(),
              valid: true,
              Place:user.Address,
              Indate:InDate
            },
          });
          return NextResponse.json({ outpass, msg: "Homepass created!" },{ status: 200 });
        } else {
          return NextResponse.json({ msg: "Hosttler doesn't exist" }, { status: 404 });
        }
      } catch (error) {
        return NextResponse.json({ error: "Error: " + error }, { status: 500 });
      }
}