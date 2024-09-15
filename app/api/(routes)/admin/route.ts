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
    const body = await req.json()
    const payload = body.postInputs
    console.log(payload)
    try {
    
    const admin=  await prisma.admin.findUnique({
        where: {
            username:payload.username,
            password:payload.password
        }
    }) 
    if (admin) {
      return NextResponse.json({msg:"logged in successfully"})  
    }
    else{
      return {
        notFound: true,
        Response:NextResponse.json({msg:"admin doesn't exist"}) }
    }
    
    
    } catch (error) {
        return NextResponse.json("error:" + error)
    }
    
    
    
}