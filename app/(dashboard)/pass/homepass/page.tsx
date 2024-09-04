"use client"
import { CardPass } from "@/components/CardPass";
import { useSearchParams } from "next/navigation";

export default function Homepass(){
    const searchParams = useSearchParams();
    const rollNo = searchParams.get('rollNo') 
    return <div >
          <CardPass rollNumber={rollNo} type="homepass" />
    </div>
}