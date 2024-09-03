// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client'


// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// export async function POST(req: NextRequest) {
//     const payload = await req.json()
//     const rollNo = payload.rollno
//     try {
        
//     } catch (error) {
        
//     }
//     return NextResponse.json({"YourRollno":rollNo})
// }