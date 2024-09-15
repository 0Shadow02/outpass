import { PrismaClient, outpass } from '@prisma/client';
import { NextResponse } from 'next/server';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export async function GET() {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    try {
        const Todos = await prisma.outpass.findMany({
            where: {
                StartTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                }
            },
            orderBy: {
                StartTime: 'desc',
            },
        });
        
        if (Todos.length > 0) {
            return NextResponse.json(Todos, { status: 200 });
        } else {
            return NextResponse.json("No outpass found", { status: 411 });
        }
    } catch (error) {
        return NextResponse.json(`Error while requesting: ${error}`, { status: 500 });
    }
}
