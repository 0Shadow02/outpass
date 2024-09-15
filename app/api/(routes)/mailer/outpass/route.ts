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
     
     
     const outpass= await prisma.outpass.findFirst({
        where:{
            userId:user.id
         },
         orderBy:{
            StartTime:'desc'
         }
    })
        if(outpass){
        try {
            const subject = "Outpass Created ✔";
            const to =email
            const text = `
            Outpass Details:
            Name: ${outpass?.Name}
            Roll No: ${outpass?.rollNo}
            Address: ${outpass?.Address}
            Phone: ${outpass?.Phone_number}
            Guardian's Phone: ${outpass?.Guardians_Pno}
            Valid From: ${outpass?.StartTime.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })}
            Place: ${outpass?.Place}
        `;
        const html = `
            <div style="background-color: #2d3748; color: #cbd5e0; border-radius: 8px; padding: 20px; max-width: 400px; margin: auto;">
                <h2 style="color: #68d391;">Outpass Details</h2>
                <p><strong>Name:</strong> ${outpass?.Name}</p>
                <p><strong>Roll No:</strong> ${outpass?.rollNo}</p>
                <p><strong>Address:</strong> ${outpass?.Address}</p>
                <p><strong>Phone:</strong> ${outpass?.Phone_number}</p>
                <p><strong>Guardian's Phone:</strong> ${outpass?.Guardians_Pno}</p>
                <p><strong>Valid From:</strong> ${outpass?.StartTime.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })}</p>
                <p><strong>Valid Upto:</strong> ${outpass.StartTime.toLocaleDateString('en-GB')},   8 pm</p>
                <p><strong>Place:</strong> ${outpass?.Place}</p>
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
