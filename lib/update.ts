

import { PrismaClient } from '@prisma/client'
const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  
  declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  } & typeof global;
  
  const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
  
  
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export async function updateExpired() {  
    try {  
        const currentTime = new Date();  
        const currentHour = currentTime.getHours();  

        if (currentHour >= 20) {   
            await prisma.outpass.updateMany({  
                where: {  
                    valid: true,   
                    StartTime: {  
                        lte: new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 20),   
                    }  
                },  
                data: {  
                    expired: true   
                },  
            });  
            console.log("Expired outpasses registered");  
        }  
    } catch (error) {  
        console.error("Error: ", error);  
    }  
}