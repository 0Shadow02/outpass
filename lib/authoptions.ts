import CredentialsProvider from 'next-auth/providers/credentials';
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
export const authOptions= {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'Username', type: 'text', placeholder: 'User@nith...', required: true },
            password: { label: 'password', type: 'password', placeholder: 'Pass@123' ,required: true },
          },
          async authorize(credentials: any) {
              const username= credentials.username
              const password= credentials.password
              const admin=  await prisma.admin.findUnique({
                  where: {
                      username,
                      password
                  }
              }) 
              if(!admin){
                  return null
              }
              return {
                  id: "user1"
              };
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
  }