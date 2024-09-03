"use client"
import { Card } from "@/components/Card";
import { useSearchParams } from "next/navigation";

export default function Homepass(){
    const searchParams = useSearchParams();
    const rollNo = searchParams.get('rollNo') 
    return <div >
          <Card rollNumber={rollNo} type="homepass" />
    </div>
}