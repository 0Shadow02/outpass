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

export async function GET(req:NextRequest){   
     try {
        const outpasses = await prisma.outpass.findMany({
            where:{
                valid:true
            }
        })
          return NextResponse.json({ outpasses},{ status: 200 });
        
      } catch (error) {
        return NextResponse.json({ error: "Error: " + error }, { status: 500 });
      }
}