import { mailOptions, transporter } from "@/lib/mailer";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  
  declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  } & typeof global;
  
  const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
  
  export default prisma
  
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
  
  export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const rollNo = searchParams.get('rollNo')?.toUpperCase() || "";
    const user = await prisma.hostellers.findFirst({
        where: {
            Rollno: rollNo,
        },
    });
    if (user) {
        const val = user.Rollno.toLowerCase()
        const email= val.concat("@nith.ac.in")
     const homePass= await prisma.homepass.findFirst({
        where:{
            userId:user.id

         }
    })
     
        if(homePass){

        try {
            const subject = "Homepass Created ✔";
            const to = email
            const text = `
            Home Pass Details:
            Name: ${homePass?.Name}
            Roll No: ${homePass?.rollNo}
            Address: ${homePass?.Address}
            Phone: ${homePass?.Phone_number}
            Guardian's Phone: ${homePass?.Guardians_Pno}
            Valid From: ${homePass?.StartTime.toLocaleString()}
            Place: ${homePass?.Place}
            Indate: ${homePass?.Indate.toLocaleString()}
        `;
        const html = `
            <div style="background-color: #2d3748; color: #cbd5e0; border-radius: 8px; padding: 20px; max-width: 400px; margin: auto;">
                <h2 style="color: #68d391;">Home Pass Details</h2>
                <p><strong>Name:</strong> ${homePass?.Name}</p>
                <p><strong>Roll No:</strong> ${homePass?.rollNo}</p>
                <p><strong>Address:</strong> ${homePass?.Address}</p>
                <p><strong>Phone:</strong> ${homePass?.Phone_number}</p>
                <p><strong>Guardian's Phone:</strong> ${homePass?.Guardians_Pno}</p>
                <p><strong>Valid From:</strong> ${homePass?.StartTime.toLocaleString()}</p>
                <p><strong>Place:</strong> ${homePass?.Place}</p>
                <p><strong>Indate:</strong> ${homePass?.Indate.toLocaleString()}</p>
            </div>
        `;


            await transporter.sendMail({
                ...mailOptions,
                to,
                subject,
                text,
                html,
            });

            return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: `Failed to send message: ${error}` }, { status: 500 });
        }
    }
    } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
     }
}
