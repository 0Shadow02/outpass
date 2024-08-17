import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { send } from "process";

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
    const body = await req.json()
    const payload = body.rollnumber
    
    try {
    
    const user=  await prisma.hostellers.findFirst({
        where: {
            Rollno:payload
        }
    }) 
    if (user) {
    const outpass=  await prisma.outpass.create({
            data:{
                userId:user.id,
                rollNo: user.Rollno,
                Name: user.Name,
                StartTime:new Date(),
                valid: true

            }
        })
      return NextResponse.json({outpass,msg:"OutPass created!"})  
    }
    else{
      return {
        notFound: true,
        Response:NextResponse.json({msg:"hosttler doesn't exist"}) }
    }
    
    
    } catch (error) {
        return NextResponse.json("error:" + error)
    }
    
    
    
}
