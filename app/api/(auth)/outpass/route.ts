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
    const { searchParams } = new URL(req.url);
    const res = searchParams.get('id');
    if (res === null) {
        return NextResponse.json({ msg: "ID parameter is required" }, { status: 400 });
    }

    const id = parseInt(res);
    
    if (isNaN(id)) {
        return NextResponse.json({ msg: "ID must be a valid number" }, { status: 400 });
    }
    
    try {

    const outpass=  await prisma.outpass.findFirst({
            where:{
               id
            }
        })
    if( outpass){
        return NextResponse.json({outpass})  
    }
    
    else{
      return {
        notFound: true,
        Response:NextResponse.json({msg:"not found"}) }
    }
    
    
    } catch (error) {
        return NextResponse.json("error:" + error)
    }
    

    
}