
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

        // Check if the current hour is before 1 AM
        if (currentHour >= 20 || currentHour < 1) {   
            await prisma.outpass.updateMany({  
                where: {  
                    valid: true,   
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
