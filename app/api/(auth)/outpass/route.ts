import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma



export async function POST(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const rollNo = searchParams.get('rollNo')||"";
     try {
        const user = await prisma.hostellers.findFirst({
          where: {
            Rollno: rollNo,
          },
        });
       if(user){
          const outpass = await prisma.outpass.create({
            data: {
              userId: user.id,
              rollNo: user.Rollno,
              Name: user.Name,
              Address:user.Address,
              Phone_number:user.Phone_number,
              Guardians_Pno:user.Guardians_Pno,
              StartTime: new Date(),
              valid: true,
              Place: "Market"
            },
          });
          return NextResponse.json({ outpass, msg: "OutPass created!" },{ status: 200 });
        } else {
          return NextResponse.json({ msg: "Hosttler doesn't exist" }, { status: 404 });
        }
      } catch (error) {
        return NextResponse.json({ error: "Error: " + error }, { status: 500 });
      }
}

export async function GET(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const rollNo = searchParams.get('rollNo')||"";
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
     try {
        const user = await prisma.hostellers.findFirst({
          where: {
            Rollno: rollNo,
          },
        });
        if (user) {
         const Alreadyexist = await prisma.outpass.findFirst({
          where:{
            userId:user.id,
            rollNo:rollNo,
            StartTime: {
              gte: startOfDay,
              lte: endOfDay,
          }
          }
         })
         if (Alreadyexist) {
          return NextResponse.json({Alreadyexist},{status:200})
         }
         else{
          return NextResponse.json("No outpass found",{status:200})
         }
          
        } else {
          return NextResponse.json({ msg: "Hosttler doesn't exist" }, { status: 404 });
        }
      } catch (error) {
        return NextResponse.json({ error: "Error: " + error }, { status: 500 });
      }
}